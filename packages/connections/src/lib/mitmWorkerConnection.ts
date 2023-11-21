import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { Logger } from 'winston';

import { DTO } from './utils/type';
import { RotomProtos } from './utils/mitmProto';
import WelcomeMessage = RotomProtos.WelcomeMessage;

let instanceNo = 0;

export type MitmWorkerDTO = Omit<DTO<MitmWorkerConnection>, 'ws' | 'log' | 'heartbeatHandle'>;

export class MitmWorkerConnection extends EventEmitter {
  workerId?: string;
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
    ws.on('pong', () => this.heartbeat());

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

  heartbeat() {
    this.isAlive = true;
  }

  checkHeartbeat() {
    if (!this.isAlive) {
      // Pong has not been received in last interval seconds
      this.log.warn(`${this.workerId}/${this.instanceNo}: MITM - No response to ping - forcing disconnect`);
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();

      return;
    }

    this.isAlive = false;
    this.ws.ping();
  }

  disconnected() {
    this.isAlive = false;
    clearInterval(this.heartbeatHandle);

    this.emit('disconnected', this);
  }

  serialize(): MitmWorkerDTO {
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
    };
  }
}
