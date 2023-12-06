process.title = 'Rotom';
import { config } from '@rotom/config';
import { FastifyInstance } from 'fastify';
import { inspect } from 'util';
import { MitmWorkerConnection, ScannerConnection, MitmControlConnection } from '@rotom/connections';
import { WebSocketServer } from 'ws';
import { StatusDTO, WorkerDTO, JobsDTO, JobsStatusDTO } from '@rotom/types';
import {
  promRegistry,
  workersTotalGauge,
  workersActiveGauge,
  devicesTotalGauge,
  devicesAliveGauge,
  deviceMemoryFree,
  deviceMemoryMitm,
  deviceMemoryStart,
} from './utils';

import { JobExecutor } from './jobExecutor';
import { jobs, JobLoader } from './jobLoader';
import { log } from './logger';
import { startWebserver, fastify } from './webserver';
//import fa from '@faker-js/faker/locales/fa';

/* Initialise websocket server from Mitm */
const wssMitm = new WebSocketServer({ port: config.deviceListener.port, perMessageDeflate: false });

const controlConnections: Record<string, MitmControlConnection> = {};
const currentConnections: Record<string, { mitm: MitmWorkerConnection; scanner: ScannerConnection | null }> = {};
const unallocatedConnections: string[] = [];
const deviceInformation: Record<string, { lastScannerConnection: number }> = {};

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

wssMitm.on('connection', (ws, req) => {
  if (config.deviceListener.secret) {
    if (config.deviceListener.secret != req.headers['x-rotom-secret']) {
      log.info(`MITM: New connection from ${req.socket.remoteAddress} url ${req.url} - incorrect secret, rejecting`);
      ws.close(3401, 'Invalid secret presented');
      return;
    }
  }
  log.info(`MITM: New connection from ${req.socket.remoteAddress} url ${req.url}`);

  if (req.url === '/control') {
    const mitmControlConnection = new MitmControlConnection(log, ws);
    mitmControlConnection.on('init', (mitm: MitmControlConnection) => {
      log.info(
        `${mitm.deviceId}/${mitm.instanceNo}: Control Channel received id packet origin ${mitm.origin} - version ${mitm.version}`,
      );

      const deviceId = mitm.deviceId as string;

      controlConnections[deviceId] = mitm;
      deviceInformation[deviceId] = {
        lastScannerConnection: Date.now() / 1000,
      };

      const mitmTestIntervalHandle = setInterval(async () => {
        // MITM current internal reboot logic:
        // (((currentMemory/memoryUsageStart) > 2f && memFree < 80000) || memFree < 50000 || (currentMemory/memoryUsageStart) < 4f) && (Settings.memoryDetection && Settings.scanmode == 0)

        try {
          const memoryStatus = await mitm.getMemoryUsage();
          log.info(`${mitm.deviceId}/${mitm.instanceNo}:Memory = ${JSON.stringify(memoryStatus)}`);
          let restartRequired = false;
          if (memoryStatus.memFree && memoryStatus.memFree < config.monitor.minMemory) {
            log.warn(
              `${mitm.deviceId}/${mitm.instanceNo}: ${memoryStatus.memFree} < ${config.monitor.minMemory} - RESTART REQUIRED`,
            );
            restartRequired = true;
          }
          if (memoryStatus.memStart) {
            const prefix = Object.keys(config.monitor.maxMemStartMultipleOverwrite).find((key) =>
              mitm.origin?.startsWith(key),
            );

            const value = prefix
              ? config.monitor.maxMemStartMultipleOverwrite[prefix]
              : config.monitor.maxMemStartMultiple;

            if (memoryStatus.memMitm > memoryStatus.memStart * value) {
              log.warn(
                `${mitm.deviceId}/${mitm.instanceNo}: ${memoryStatus.memMitm} > ${memoryStatus.memStart} * ${value} - RESTART REQUIRED`,
              );
              restartRequired = true;
            }
          }

          if (restartRequired) {
            if (config.monitor.reboot) {
              log.warn(`${mitm.deviceId}/${mitm.instanceNo}: Asking for reboot`);
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              mitm.reboot().catch(() => {});
            } else {
              log.warn(`${mitm.deviceId}/${mitm.instanceNo}: Asking for restart`);
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              mitm.restartApp().catch(() => {});
            }
          }
        } catch {
          // Do nothing
        }
      }, 60000);

      mitm.on('disconnected', (/* mitmControl: MitmControlConnection */) => {
        // This would remove disconnected entries immediately

        // if (controlConnections[deviceId] && controlConnections[deviceId] == mitmControl) {
        //   delete controlConnections[deviceId];
        // }

        clearInterval(mitmTestIntervalHandle);
      });
    });
    return;
  }

  const mitmConnection = new MitmWorkerConnection(log, ws);
  mitmConnection.on('init', (mitmWorker: MitmWorkerConnection) => {
    log.info(
      `${mitmWorker.workerId}/${mitmWorker.instanceNo}: Received id packet origin ${mitmWorker.origin} - version ${mitmWorker.version}`,
    );

    const workerId = mitmWorker.workerId as string;

    const currentConnection = currentConnections[workerId];
    if (currentConnection) {
      log.info(`${mitmWorker.workerId}/${mitmWorker.instanceNo}: This is a reconnection, making this current`);
      if (currentConnection.scanner) {
        log.info(`${mitmWorker.workerId}/${mitmWorker.instanceNo}: Scanner was connected - closing it`);
        currentConnection.scanner.disconnect();
      }
    }
    currentConnections[workerId] = {
      mitm: mitmWorker,
      scanner: null,
    };
    if (!unallocatedConnections.includes(workerId)) unallocatedConnections.push(workerId);
    log.info(`${workerId}: unallocated connections = ${unallocatedConnections.join(',')}`);
  });

  mitmConnection.on('disconnected', (mitmWorker: MitmWorkerConnection) => {
    const workerId = mitmWorker.workerId as string;
    const instanceNo = mitmWorker.instanceNo;

    console.log(`${workerId}/${instanceNo}: Disconnected; performing disconnection activities`);
    if (workerId) {
      const currentConnection = currentConnections[workerId];
      if (currentConnection) {
        if (currentConnection.mitm !== mitmWorker) {
          log.info(`${workerId}/${instanceNo}: Disconnection of non-current connection, ignoring`);
          return;
        }

        if (currentConnection.scanner) {
          log.info(`${workerId}: Disconnect: There was a Scanner connected, disconnecting`);
          currentConnection.scanner.disconnect();
        }
      }

      delete currentConnections[workerId];

      // remove connection from unallocated connections
      for (let index = unallocatedConnections.length - 1; index >= 0; index--) {
        if (unallocatedConnections[index] === workerId) unallocatedConnections.splice(index, 1);
      }
      log.info(`${workerId}: unallocated connections = ${unallocatedConnections.join(',')}`);
    }
  });
});

/* Initialise websocket server from Scanner */

const wssScanner = new WebSocketServer({ port: config.controllerListener.port });

function identifyControlChannelFromWorkerId(workerId: string): string | null {
  // Try to look up connected worker id and see if it presented us with a device id
  const connection = currentConnections[workerId];

  if (connection) {
    const deviceId = connection.mitm?.deviceId;
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

wssScanner.on('connection', (ws, req) => {
  if (config.controllerListener.secret) {
    if (config.controllerListener.secret != req.headers['x-rotom-secret']) {
      log.info(`SCANNER: New connection from ${req.socket.remoteAddress} - incorrect secret, rejecting`);
      ws.close(3401, 'Invalid secret presented');
      return;
    }
  }

  if (!unallocatedConnections.length) {
    log.info(`SCANNER: New connection from ${req.socket.remoteAddress} - no spare MITMs, rejecting`);
    // error!
    ws.close(3001, 'No devices available');
    return;
  }

  let nextSpareWorkerId = unallocatedConnections.shift() as string;
  let eligibleDeviceFound = false;
  const firstSpareWorkerId = nextSpareWorkerId;
  do {
    const mainDeviceId = identifyControlChannelFromWorkerId(nextSpareWorkerId);
    log.info(`SCANNER: Found ${mainDeviceId} connects to workerId ${nextSpareWorkerId}`);
    if (mainDeviceId == null) {
      log.info(`SCANNER: Warning - found ${nextSpareWorkerId} in pool with no record of main device`);
      unallocatedConnections.push(nextSpareWorkerId);
      nextSpareWorkerId = unallocatedConnections.shift() as string;
    } else {
      const mainDeviceInfo = deviceInformation[mainDeviceId];
      if (!mainDeviceInfo) {
        log.info(`SCANNER: Warning - found ${nextSpareWorkerId} in pool with no record of main device ${mainDeviceId}`);
        unallocatedConnections.push(nextSpareWorkerId);
        nextSpareWorkerId = unallocatedConnections.shift() as string;
      } else {
        if (mainDeviceInfo.lastScannerConnection + config.monitor.deviceCooldown > Date.now() / 1000) {
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
      `SCANNER: New connection from ${req.socket.remoteAddress} - no MITMs available outside cooldown, rejecting`,
    );
    // error!
    ws.close(3001, 'All devices are in cooldown');
    return;
  }

  // Set last connection time on device
  const mainDeviceId = identifyControlChannelFromWorkerId(nextSpareWorkerId) as string;
  deviceInformation[mainDeviceId].lastScannerConnection = Date.now() / 1000;

  log.info(`SCANNER: New connection from ${req.socket.remoteAddress} - will allocate ${nextSpareWorkerId}`);

  const currentConnection = currentConnections[nextSpareWorkerId];
  const scannerConnection = new ScannerConnection(log, ws, currentConnection.mitm);
  currentConnection.scanner = scannerConnection;

  scannerConnection.on('disconnected', (con: ScannerConnection) => {
    // Replace webservice connection as available
    const workerId = con.workerId;
    log.info(
      `SCANNER: Disconnected worker ${con.workerName}/${con.instanceNo} device - disconnecting from mitm to trigger cleanup`,
    );

    // Mark this Scanner as not in use
    const currentConnection = currentConnections[workerId];
    if (currentConnection) {
      currentConnection.scanner = null;
    } else {
      log.info(`SCANNER: did not find a connection from this MITM`);
    }

    // Now disconnect mitm
    con.disconnectMitm();
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
      if (connections && connections.mitm && connections.mitm.origin) {
        const mitm = connections.mitm;
        const SCANNER = connections.scanner;

        connectionCounts.push(
          `${mitm.origin}[${mitm.workerId}]: ${mitm.noMessagesSent}${
            dateNow - mitm.dateLastMessageSent > 10000 ? '*' : ''
          }/${mitm.noMessagesReceived}${dateNow - mitm.dateLastMessageReceived > 10000 ? '*' : ''} ${
            SCANNER ? `SCANNER ${SCANNER.workerName}/${SCANNER.instanceNo}` : 'Unused'
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

      const validMemFree = Number.isFinite(connection.lastMemory.memFree) ? connection.lastMemory.memFree : 0;
      deviceMemoryFree.labels(origin).set(validMemFree);
      const validMemMitm = Number.isFinite(connection.lastMemory.memMitm) ? connection.lastMemory.memMitm : 0;
      deviceMemoryMitm.labels(origin).set(validMemMitm);
      const validMemStart = Number.isFinite(connection.lastMemory.memStart) ? connection.lastMemory.memStart : 0;
      deviceMemoryStart.labels(origin).set(validMemStart);
    });

  // Set device counts
  devicesTotalGauge.set(Object.keys(controlConnections).length);
  devicesAliveGauge.set(connectedDevices);

  // fetch active workers
  const originActiveWorkers: Record<string, number> = {};
  const originTotalWorkers: Record<string, number> = {};
  Object.entries(currentConnections).forEach(([, connection]) => {
    const origin = connection.mitm?.origin || 'Unknown';
    if (!(origin in originActiveWorkers)) {
      originActiveWorkers[origin] = 0;
    }
    if (!(origin in originTotalWorkers)) {
      originTotalWorkers[origin] = 0;
    }

    originTotalWorkers[origin] += 1;
    if (connection.scanner && connection.scanner.isAlive && connection.mitm.isAlive) {
      originActiveWorkers[origin] += 1;
    }
  });

  // set workers, but first reset to get rid of dropped origins
  workersTotalGauge.reset();
  workersActiveGauge.reset();
  Object.entries(originTotalWorkers).forEach(([name, number]) => {
    const validNumber = Number.isFinite(number) ? number : 0;
    workersTotalGauge.labels(name).set(validNumber);
  });
  Object.entries(originActiveWorkers).forEach(([name, number]) => {
    const validNumber = Number.isFinite(number) ? number : 0;
    workersActiveGauge.labels(name).set(validNumber);
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
          connection.mitm?.deviceId ??
          Object.keys(controlConnections).find((deviceId) => workerId.startsWith(deviceId));

        return {
          deviceId,
          scanner: connection.scanner?.serialize(),
          isAllocated,
          mitm: connection.mitm.serialize(),
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
    deviceIdsOrOrigins: string;
    jobId: string;
  }

  fastifyInstance.post<{ Params: JobExecuteParams }>(
    '/api/job/execute/:jobId/:deviceIdsOrOrigins',
    async (req, reply) => {
      const deviceIdsOrOrigins = req.params.deviceIdsOrOrigins.split(',');
      const jobId = req.params.jobId;
      const job = jobs.getById(jobId);

      if (!job) {
        reply.code(404).send({ status: 'error', error: 'Job not found' });

        return;
      }

      const devices: MitmControlConnection[] = deviceIdsOrOrigins
        .map((deviceIdOrOrigin) => {
          if (deviceIdOrOrigin in controlConnections) {
            return controlConnections[deviceIdOrOrigin];
          }

          return Object.values(controlConnections).find((device) => device.origin === deviceIdOrOrigin);
        })
        .filter((device): device is MitmControlConnection => !!device);

      if (devices.length === 0) {
        reply.code(404).send({ status: 'error', error: `No device found with IDS or origins ${deviceIdsOrOrigins}` });

        return;
      }

      log.info(`Execute job on device ${deviceIdsOrOrigins} job id ${jobId}`);

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
