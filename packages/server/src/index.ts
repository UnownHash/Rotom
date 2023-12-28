process.title = 'Rotom';
import { config } from '@rotom/config';
import { ControllerConnection, DeviceControlConnection, DeviceWorkerConnection } from '@rotom/connections';
import { JobsDTO, JobsStatusDTO, StatusDTO, WorkerDTO } from '@rotom/types';
import { FastifyInstance } from 'fastify';
import { inspect } from 'util';
import { WebSocketServer } from 'ws';
import {
  deviceMemoryFree,
  deviceMemoryMitm,
  deviceMemoryStart,
  devicesAliveGauge,
  devicesTotalGauge,
  promRegistry,
  valueOrZero,
  workersActiveGauge,
  workersTotalGauge,
} from './utils';

import { JobExecutor } from './jobExecutor';
import { JobLoader, jobs } from './jobLoader';
import { log } from './logger';
import { fastify, startWebserver } from './webserver';
//import fa from '@faker-js/faker/locales/fa';

/* Initialise websocket server from Mitm */
const wssDevice = new WebSocketServer({ port: config.deviceListener.port, perMessageDeflate: false });

const controlConnections: Record<string, DeviceControlConnection> = {};
const currentConnections: Record<
  string,
  { deviceWorker: DeviceWorkerConnection; controller: ControllerConnection | null }
> = {};
const unallocatedConnections: string[] = [];
const deviceInformation: Record<string, { lastControllerConnection: number }> = {};

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    log.error(`${inspect(reason)} Unhandled rejection at promise ${inspect(p)}`);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    log.error(`${inspect(err)} Uncaught Exception thrown`);

    process.exit(1);
  })
  .on('SIGINT', function () {
    console.log('Caught interrupt signal');
    process.exit();
  });

wssDevice.on('connection', (ws, req) => {
  if (config.deviceListener.secret) {
    if (config.deviceListener.secret != req.headers['x-rotom-secret']) {
      log.info(`Device: New connection from ${req.socket.remoteAddress} url ${req.url} - incorrect secret, rejecting`);
      ws.close(3401, 'Invalid secret presented');
      return;
    }
  }
  log.info(`Device: New connection from ${req.socket.remoteAddress} url ${req.url}`);

  if (req.url === '/control') {
    const deviceControlConnection = new DeviceControlConnection(log, ws);
    deviceControlConnection.on('init', (device: DeviceControlConnection) => {
      log.info(
        `${device.deviceId}/${device.instanceNo}: Control Channel received id packet origin ${device.origin} - version ${device.version}`,
      );

      const deviceId = device.deviceId as string;

      controlConnections[deviceId] = device;
      deviceInformation[deviceId] = {
        lastControllerConnection: Date.now() / 1000,
      };

      const deviceTestIntervalHandle = setInterval(async () => {
        // Device current internal reboot logic:
        // (((currentMemory/memoryUsageStart) > 2f && memFree < 80000) || memFree < 50000 || (currentMemory/memoryUsageStart) < 4f) && (Settings.memoryDetection && Settings.scanmode == 0)

        try {
          const memoryStatus = await device.getMemoryUsage();
          log.info(`${device.deviceId}/${device.instanceNo}:Memory = ${JSON.stringify(memoryStatus)}`);
          let restartRequired = false;
          if (config.monitor.enabled && memoryStatus.memFree && memoryStatus.memFree < config.monitor.minMemory) {
            log.warn(
              `${device.deviceId}/${device.instanceNo}: ${memoryStatus.memFree} < ${config.monitor.minMemory} - RESTART REQUIRED`,
            );
            restartRequired = true;
          }
          if (memoryStatus.memStart) {
            const prefix = Object.keys(config.monitor.maxMemStartMultipleOverwrite).find((key) =>
              device.origin?.startsWith(key),
            );

            const value = prefix
              ? config.monitor.maxMemStartMultipleOverwrite[prefix]
              : config.monitor.maxMemStartMultiple;

            if (config.monitor.enabled && memoryStatus.memMitm > memoryStatus.memStart * value) {
              log.warn(
                `${device.deviceId}/${device.instanceNo}: ${memoryStatus.memMitm} > ${memoryStatus.memStart} * ${value} - RESTART REQUIRED`,
              );
              restartRequired = true;
            }
          }

          if (restartRequired) {
            if (config.monitor.reboot) {
              log.warn(`${device.deviceId}/${device.instanceNo}: Asking for reboot`);
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              device.reboot().catch(() => {});
            } else {
              log.warn(`${device.deviceId}/${device.instanceNo}: Asking for restart`);
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              device.restartApp().catch(() => {});
            }
          }
        } catch {
          // Do nothing
        }
      }, 60000);

      device.on('disconnected', (/* mitmControl: MitmControlConnection */) => {
        // This would remove disconnected entries immediately

        // if (controlConnections[deviceId] && controlConnections[deviceId] == mitmControl) {
        //   delete controlConnections[deviceId];
        // }

        clearInterval(deviceTestIntervalHandle);
      });
    });
    return;
  }

  const deviceConnection = new DeviceWorkerConnection(log, ws);
  deviceConnection.on('init', (deviceWorker: DeviceWorkerConnection) => {
    log.info(
      `${deviceWorker.workerId}/${deviceWorker.instanceNo}: Received id packet origin ${deviceWorker.origin} - version ${deviceWorker.version}`,
    );

    const workerId = deviceWorker.workerId as string;

    const currentConnection = currentConnections[workerId];
    if (currentConnection) {
      log.info(`${deviceWorker.workerId}/${deviceWorker.instanceNo}: This is a reconnection, making this current`);
      if (currentConnection.controller) {
        log.info(`${deviceWorker.workerId}/${deviceWorker.instanceNo}: Controller was connected - closing it`);
        currentConnection.controller.disconnect();
      }
    }
    currentConnections[workerId] = {
      deviceWorker: deviceWorker,
      controller: null,
    };
    if (!unallocatedConnections.includes(workerId)) unallocatedConnections.push(workerId);
    log.info(
      `${workerId}: unallocated connections = ${
        unallocatedConnections.length > 10
          ? unallocatedConnections.length.toLocaleString()
          : unallocatedConnections.join(', ')
      }`,
    );
  });

  deviceConnection.on('disconnected', (deviceWorker: DeviceWorkerConnection) => {
    const workerId = deviceWorker.workerId as string;
    const instanceNo = deviceWorker.instanceNo;

    console.log(`${workerId}/${instanceNo}: Disconnected; performing disconnection activities`);
    if (workerId) {
      const currentConnection = currentConnections[workerId];
      if (currentConnection) {
        if (currentConnection.deviceWorker !== deviceWorker) {
          log.info(`${workerId}/${instanceNo}: Disconnection of non-current connection, ignoring`);
          return;
        }

        if (currentConnection.controller) {
          log.info(`${workerId}: Disconnect: There was a Controller connected, disconnecting`);
          currentConnection.controller.disconnect();
        }
      }

      delete currentConnections[workerId];

      // remove connection from unallocated connections
      for (let index = unallocatedConnections.length - 1; index >= 0; index--) {
        if (unallocatedConnections[index] === workerId) unallocatedConnections.splice(index, 1);
      }
      log.info(
        `${workerId}: unallocated connections = ${
          unallocatedConnections.length > 10
            ? unallocatedConnections.length.toLocaleString()
            : unallocatedConnections.join(', ')
        }`,
      );
    }
  });
});

/* Initialize websocket server from Controller */

const wssController = new WebSocketServer({ port: config.controllerListener.port });

function identifyControlChannelFromWorkerId(workerId: string): string | null {
  // Try to look up connected worker id and see if it presented us with a device id
  const connection = currentConnections[workerId];

  if (connection) {
    const deviceId = connection.deviceWorker?.deviceId;
    if (deviceId) {
      return deviceId;
    }
  }

  // Fallback: Find a currently connected control connection that starts with the same characters
  // as the given device id
  for (const key of Object.keys(controlConnections)) {
    if (workerId.substring(0, key.length) === key) return key;
  }
  return null;
}

wssController.on('connection', (ws, req) => {
  if (config.controllerListener.secret) {
    if (config.controllerListener.secret != req.headers['x-rotom-secret']) {
      log.info(`CONTROLLER: New connection from ${req.socket.remoteAddress} - incorrect secret, rejecting`);
      ws.close(3401, 'Invalid secret presented');
      return;
    }
  }

  if (!unallocatedConnections.length) {
    log.info(`CONTROLLER: New connection from ${req.socket.remoteAddress} - no spare Workers, rejecting`);
    // error!
    ws.close(3001, 'No workers available');
    return;
  }

  let nextSpareWorkerId = unallocatedConnections.shift() as string;
  let eligibleDeviceFound = false;
  const firstSpareWorkerId = nextSpareWorkerId;
  do {
    const mainDeviceId = identifyControlChannelFromWorkerId(nextSpareWorkerId);
    log.info(`CONTROLLER: Found ${mainDeviceId} connects to workerId ${nextSpareWorkerId}`);
    if (mainDeviceId == null) {
      log.info(`CONTROLLER: Warning - found ${nextSpareWorkerId} in pool with no record of main device`);
      unallocatedConnections.push(nextSpareWorkerId);
      nextSpareWorkerId = unallocatedConnections.shift() as string;
    } else {
      const mainDeviceInfo = deviceInformation[mainDeviceId];
      if (!mainDeviceInfo) {
        log.info(
          `CONTROLLER: Warning - found ${nextSpareWorkerId} in pool with no record of main device ${mainDeviceId}`,
        );
        unallocatedConnections.push(nextSpareWorkerId);
        nextSpareWorkerId = unallocatedConnections.shift() as string;
      } else {
        if (mainDeviceInfo.lastControllerConnection + config.monitor.deviceCooldown > Date.now() / 1000) {
          // device was allocated to someone else too recently, find another
          unallocatedConnections.push(nextSpareWorkerId);
          nextSpareWorkerId = unallocatedConnections.shift() as string;
        } else {
          eligibleDeviceFound = true;
        }
      }
    }
  } while (!eligibleDeviceFound && nextSpareWorkerId != firstSpareWorkerId);

  if (!eligibleDeviceFound) {
    // no devices found, return the original one back to pool
    unallocatedConnections.push(nextSpareWorkerId);
    log.info(
      `CONTROLLER: New connection from ${req.socket.remoteAddress} - no Devices available outside cooldown, rejecting`,
    );
    // error!
    ws.close(3001, 'All devices are in cooldown');
    return;
  }

  // Set last connection time on device
  const mainDeviceId = identifyControlChannelFromWorkerId(nextSpareWorkerId) as string;
  deviceInformation[mainDeviceId].lastControllerConnection = Date.now() / 1000;

  log.info(`CONTROLLER: New connection from ${req.socket.remoteAddress} - will allocate ${nextSpareWorkerId}`);

  const currentConnection = currentConnections[nextSpareWorkerId];
  const controllerConnection = new ControllerConnection(log, ws, currentConnection.deviceWorker);
  currentConnection.controller = controllerConnection;

  controllerConnection.on('disconnected', (con: ControllerConnection) => {
    // Replace webservice connection as available
    const workerId = con.workerId;
    log.info(
      `CONTROLLER: Disconnected worker ${con.workerName}/${con.instanceNo} device - disconnecting from device to trigger cleanup`,
    );

    // Mark this Controller as not in use
    const currentConnection = currentConnections[workerId];
    if (currentConnection) {
      currentConnection.controller = null;
    } else {
      log.info(`CONTROLLER: did not find a connection from this device`);
    }

    // Now disconnect device
    con.disconnectDevice();
  });
});

log.info('Rotom Device Controller Started');
log.info(`Device port ${config.deviceListener.port} Controller port ${config.controllerListener.port}`);
log.debug('Debug logging on');

if (config.logging.consoleStatus) {
  setInterval(() => {
    const connectionCounts = [];
    const dateNow = Date.now();

    for (const connections of Object.values(currentConnections)) {
      if (connections && connections.deviceWorker && connections.deviceWorker.origin) {
        const deviceWorker = connections.deviceWorker;
        const CONTROLLER = connections.controller;

        connectionCounts.push(
          `${deviceWorker.origin}[${deviceWorker.workerId}]: ${deviceWorker.noMessagesSent}${
            dateNow - deviceWorker.dateLastMessageSent > 10000 ? '*' : ''
          }/${deviceWorker.noMessagesReceived}${dateNow - deviceWorker.dateLastMessageReceived > 10000 ? '*' : ''} ${
            CONTROLLER ? `CONTROLLER ${CONTROLLER.workerName}/${CONTROLLER.instanceNo}` : 'Unused'
          }`,
        );
      }
    }
    for (let no = 0; no < connectionCounts.length; no++) {
      log.info(`STATUS: #${no + 1} ${connectionCounts[no]}`);
    }
  }, 10000);
}

// prometheus helper
// This is not the Best way to do this, but previous attemps at active tracking via events have failed
setInterval(() => {
  let connectedDevices = 0;

  // set memory for alive devices, but first reset to get rid of dropped origins
  deviceMemoryFree.reset();
  deviceMemoryMitm.reset();
  deviceMemoryStart.reset();
  Object.entries(controlConnections)
    .filter(([, connection]) => connection.isAlive)
    .forEach(([, connection]) => {
      const origin = connection?.origin || 'Unknown';
      connectedDevices += 1;
      const { memMitm, memFree, memStart } = connection.lastMemory;

      deviceMemoryFree.labels(origin).set(valueOrZero(memFree));
      deviceMemoryMitm.labels(origin).set(valueOrZero(memMitm));
      deviceMemoryStart.labels(origin).set(valueOrZero(memStart));
    });

  // Set device counts
  devicesTotalGauge.set(Object.keys(controlConnections).length);
  devicesAliveGauge.set(connectedDevices);

  // fetch active workers
  const originActiveWorkers: Record<string, number> = {};
  const originTotalWorkers: Record<string, number> = {};
  Object.entries(currentConnections).forEach(([, connection]) => {
    const origin = connection.deviceWorker?.origin || 'Unknown';
    if (!(origin in originActiveWorkers)) {
      originActiveWorkers[origin] = 0;
    }
    if (!(origin in originTotalWorkers)) {
      originTotalWorkers[origin] = 0;
    }

    originTotalWorkers[origin] += 1;
    if (connection.controller && connection.controller.isAlive && connection.deviceWorker.isAlive) {
      originActiveWorkers[origin] += 1;
    }
  });

  // set workers, but first reset to get rid of dropped origins
  workersTotalGauge.reset();
  workersActiveGauge.reset();
  Object.entries(originTotalWorkers).forEach(([name, number]) => {
    workersTotalGauge.labels(name).set(valueOrZero(number));
  });
  Object.entries(originActiveWorkers).forEach(([name, number]) => {
    workersActiveGauge.labels(name).set(valueOrZero(number));
  });
}, 5000);

const jobLoader = new JobLoader(log);
jobLoader.load();
jobLoader.watch();

const jobExecutor = new JobExecutor();

const routes = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/api/getPublicIp', () => {
    return Object.values(controlConnections)
      .filter((controlConnection) => controlConnection.isAlive)
      .map((controlConnections) => ({
        deviceId: controlConnections.deviceId,
        publicIp: controlConnections.publicIp,
      }));
  });

  fastifyInstance.post<{ Body: { deviceId: string; username: string; password: string } }>(
    '/api/ptcLogin',
    async (request, reply) => {
      const { deviceId, username, password } = request.body || {};

      if (!deviceId || !username || !password) {
        return reply.code(400).send({ status: 'error', error: 'Incorrect request' });
      }

      if (!(deviceId in controlConnections)) {
        return reply.code(404).send({ status: 'error', error: 'Device not found' });
      }

      const device = controlConnections[deviceId];

      if (!device || !device.isAlive) {
        return reply.code(404).send({ status: 'error', error: 'Device is no longer connected' });
      }

      const lastLogin = Math.max(
        ...Object.values(controlConnections)
          .filter((controlConnection) => controlConnection.isAlive)
          .map((controlConnection) => controlConnection.dateConnected),
      );

      try {
        const result = await device.ptcLogin(username, password);

        return reply.code(200).send({ status: 'ok', token: result.token, newestDevice: lastLogin });
      } catch (e) {
        const error = e as Error;
        return reply.code(200).send({ status: 'fail', reason: error.toString(), newestDevice: lastLogin });
      }
    },
  );

  fastifyInstance.get('/api/status', async (): Promise<StatusDTO> => {
    return {
      devices: Object.values(controlConnections).map((controlConnection) => controlConnection.serialize()),
      workers: Object.keys(currentConnections).map<WorkerDTO>((workerId) => {
        const connection = currentConnections[workerId];
        const isAllocated = !unallocatedConnections.includes(workerId);

        const deviceId =
          connection.deviceWorker?.deviceId ??
          Object.keys(controlConnections).find((deviceId) => workerId.startsWith(deviceId));

        return {
          deviceId,
          controller: connection.controller?.serialize(),
          isAllocated,
          worker: connection.deviceWorker.serialize(),
          workerId,
        };
      }),
    };
  });

  fastifyInstance.get('/metrics', async (request, reply) => {
    try {
      const metrics = await promRegistry.metrics();
      reply.type(promRegistry.contentType).send(metrics);
    } catch (ex) {
      reply.status(500).send();
    }
  });

  fastifyInstance.delete('/api/device', async (request, reply) => {
    log.info('Received delete all devices request');
    const deviceIds = Object.keys(controlConnections);
    let deleted = 0;
    for (const deviceId of deviceIds) {
      const device = controlConnections[deviceId];
      if (!device.isAlive) {
        delete deviceInformation[deviceId];
        delete controlConnections[deviceId];
        deleted++;
      }
    }
    log.info(`Deleted ${deleted} devices`);
    return reply.code(200).send({ status: 'ok', error: `Deleted ${deleted} devices` });
  });

  interface ActionExecuteParams {
    deviceId: keyof typeof controlConnections;
    action: 'restart' | 'reboot' | 'getLogcat' | 'delete';
  }

  fastifyInstance.post<{ Params: ActionExecuteParams }>(
    '/api/device/:deviceId/action/:action',
    async (request, reply) => {
      const { deviceId, action } = request.params;

      if (!(deviceId in controlConnections)) {
        return reply.code(404).send({ status: 'error', error: 'Device not found' });
      }

      const device = controlConnections[deviceId];

      if (action === 'reboot') {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        device.reboot().catch(() => {});
        return reply.code(200).send({ status: 'ok', error: 'Action transmitted to device.' });
      } else if (action === 'restart') {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        device.restartApp().catch(() => {});
        return reply.code(200).send({ status: 'ok', error: 'Action transmitted to device.' });
      } else if (action === 'delete') {
        if (device.isAlive) {
          return reply.code(400).send({ status: 'ok', error: "Device is Alive. Can't remove it yet." });
        }
        delete deviceInformation[deviceId];
        delete controlConnections[deviceId];
        return reply.code(200).send({ status: 'ok', error: 'Device removed.' });
      } else if (action === 'getLogcat') {
        try {
          const zipBuffer = await device.getLogcat();
          return reply
            .code(200)
            .type('application/zip')
            .header('Content-Disposition', `attachment; filename="logcat-${device.origin}.zip"`)
            .send(zipBuffer);
        } catch (e) {
          return reply.code(500).send({ status: 'error', error: 'Internal error' });
        }
      }

      return reply.code(404).send({ status: 'error', error: 'Action not found' });
    },
  );

  fastifyInstance.get('/api/job/list', (): JobsDTO => {
    return jobs.jobs;
  });

  interface JobExecuteParams {
    deviceIdsOrOrigins?: string;
    jobId: string;
  }

  interface DeviceIdsOrOriginsBody {
    deviceIdsOrOrigins?: string[] | number[];
  }

  fastifyInstance.post<{ Params: JobExecuteParams; Body: DeviceIdsOrOriginsBody }>(
    '/api/job/execute/:jobId/:deviceIdsOrOrigins?',
    async (req, reply) => {
      const { deviceIdsOrOrigins, jobId } = req.params;
      const requestBody = req.body;
      const job = jobs.getById(jobId);

      if (!job) {
        reply.code(404).send({ status: 'error', error: 'Job not found' });
        return;
      }

      // If deviceIdsOrOrigins is not set in URL params, use the value from the request body
      const deviceIdsOrOriginsList =
        deviceIdsOrOrigins !== undefined && deviceIdsOrOrigins.trim() !== ''
          ? deviceIdsOrOrigins.split(',')
          : requestBody.deviceIdsOrOrigins !== undefined
          ? requestBody.deviceIdsOrOrigins
          : [];

      const devices: DeviceControlConnection[] = deviceIdsOrOriginsList
        .map((deviceIdOrOrigin) => {
          if (deviceIdOrOrigin in controlConnections) {
            return controlConnections[deviceIdOrOrigin];
          }

          return Object.values(controlConnections).find((device) => device.origin === deviceIdOrOrigin);
        })
        .filter((device): device is DeviceControlConnection => !!device);

      if (devices.length === 0) {
        reply
          .code(404)
          .send({ status: 'error', error: `No device found with IDS or origins ${deviceIdsOrOriginsList}` });

        return;
      }

      log.info(`Execute job on device ${deviceIdsOrOriginsList} job id ${jobId}`);

      const jobNumbers = devices.map((controlConnection) => {
        return jobExecutor.runJob(controlConnection, job);
      });

      reply.code(200).send({ status: 'ok', response: 'Executing', jobNumbers });
    },
  );

  fastifyInstance.get('/api/job/status', (): JobsStatusDTO => {
    return jobExecutor.jobStatus;
  });

  fastifyInstance.get<{ Params: { jobNo: number } }>('/api/job/status/:jobNo', async (req, reply) => {
    const jobNo = req.params.jobNo;
    const result = jobExecutor.getStatus(jobNo);

    if (!result) {
      reply.code(404).send({ status: 'error', response: 'Not found' });
    }

    reply
      .code(200)
      .send({ status: 'ok', success: result.success, finished: result.executionComplete, response: result.result });
  });
};

fastify.register(routes);

startWebserver();
