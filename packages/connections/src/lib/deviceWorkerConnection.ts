import { EventEmitter, once } from 'events';
import { Logger } from 'winston';
import { WebSocket } from 'ws';

import { RotomProtos } from './utils/mitmProto';
import { DTO } from './utils/type';
import WelcomeMessage = RotomProtos.WelcomeMessage;

let instanceNo = 0;

export type DeviceWorkerDTO = Omit<DTO<DeviceWorkerConnection>, 'ws' | 'log' | 'heartbeatHandle'>;

export class DeviceWorkerConnection extends EventEmitter {
  workerId?: string;
  deviceId?: string;
  userAgent?: string;
  init: boolean;
  noMessagesReceived: number;
  dateLastMessageReceived: number;
  noMessagesSent: number;
  dateLastMessageSent: number;
  origin?: string;
  version?: string;
  ws: WebSocket;
  isAlive: boolean;
  instanceNo: number;
  heartbeatHandle: NodeJS.Timer;
  log: Logger;
  traceMessages: boolean;

  constructor(log: Logger, ws: WebSocket) {
    super();
    this.ws = ws;
    this.log = log;
    this.init = true;
    this.isAlive = true;
    this.origin = '';
    this.traceMessages = false;

    this.noMessagesSent = 0;
    this.noMessagesReceived = 0;
    this.dateLastMessageReceived = 0;
    this.dateLastMessageSent = 0;

    this.instanceNo = instanceNo++;

    ws.on('message', (data: ArrayBuffer) => this.received(data));
    ws.on('close', () => this.disconnected());
    ws.on('pong', () => this.heatbeatReceived());

    this.heartbeatHandle = setInterval(() => this.checkHeartbeat(), 30000);
  }

  received(message: ArrayBuffer) {
    // if (this.traceMessages) {
    //   this.log.info(`${this.workerId}: <MITM ${message}`);
    // } else {
    //   this.log.debug(`${this.workerId}: <MITM ${message}`);
    // }

    this.dateLastMessageReceived = Date.now();

    if (this.init) {
      let welcome: RotomProtos.WelcomeMessage;

      try {
        welcome = WelcomeMessage.decode(new Uint8Array(message));

        this.workerId = welcome.workerId;
        this.deviceId = welcome.deviceId;
        this.userAgent = welcome.useragent;
        this.version = welcome.versionCode.toString();
        this.origin = welcome.origin;
      } catch (e) {
        this.log.error(`MITM - error decoding welcome message, disconnecting`);
        this.ws.close();
        return;
      }

      this.noMessagesSent = 0;
      this.noMessagesReceived = 0;

      this.emit('init', this, message);
      this.init = false;
    } else {
      this.emit('received', message);
      this.noMessagesReceived++;
    }
  }

  send(message: ArrayBuffer) {
    // if (this.traceMessages) {
    //   this.log.info(`${this.workerId}: MITM> ${message}`);
    // } else {
    //   this.log.debug(`${this.workerId}: MITM> ${message}`);
    // }
    this.noMessagesSent++;
    this.dateLastMessageSent = Date.now();

    this.ws.send(message, { binary: true });
  }

  heatbeatReceived() {
    //this.isAlive = true;
    this.emit('isAlive', true);
  }

  async checkHeartbeat() {
    if (!this.isAlive) {
      // Pong has not been received in last interval seconds
      this.log.warn(`${this.workerId}/${this.instanceNo}: MITM - No response to ping - forcing disconnect`);
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();
      return;
    }

    //this.isAlive = false;
    this.ws.ping();
    let isAlive = false;
    try {
      // eslint-disable-next-line no-async-promise-executor
      isAlive = await new Promise<boolean>(async (resolve, reject) => {
        // Create a timeout promise
        const timeout = setTimeout(() => {
          reject("Timeout - 'ping' event did not occur within the time limit.");
        }, 15000);
        try {
          const [status] = await once(this, 'isAlive');
          clearTimeout(timeout);
          resolve(status);
        } catch (err) {
          clearTimeout(timeout);
          reject(err);
        }
      });
    } catch (err) {
      // Pong has not been received in last interval seconds
      this.log.warn(`${this.workerId}/${this.instanceNo}: MITM - No response to ping - forcing disconnect: ${err}`);
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();
    }
    this.isAlive = isAlive;
  }

  disconnected() {
    this.isAlive = false;
    clearInterval(this.heartbeatHandle);

    this.emit('disconnected', this);
  }

  serialize(): DeviceWorkerDTO {
    return {
      dateLastMessageReceived: this.dateLastMessageReceived,
      dateLastMessageSent: this.dateLastMessageSent,
      init: this.init,
      instanceNo: this.instanceNo,
      isAlive: this.isAlive,
      noMessagesReceived: this.noMessagesReceived,
      noMessagesSent: this.noMessagesSent,
      origin: this.origin,
      traceMessages: this.traceMessages,
      version: this.version,
      workerId: this.workerId,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
    };
  }
}
