import { EventEmitter } from 'events';
import { Logger } from 'winston';
import { WebSocket } from 'ws';

import { DTO } from './utils/type';

let instanceNo = 0;

class Deferred {
  promise: Promise<any>;
  reject?: (value: unknown) => void;
  resolve?: (reason?: any) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

export type DeviceControlDTO = Omit<
  DTO<DeviceControlConnection>,
  typeof EventEmitter.captureRejectionSymbol | 'ws' | 'log' | 'heartbeatHandle'
>;

interface MemoryStatus {
  memFree: number;
  memMitm: number;
  memStart: number;
}

export class DeviceControlConnection extends EventEmitter {
  deviceId?: string;
  log: Logger;
  init: boolean;
  noMessagesReceived: number;
  dateLastMessageReceived: number;
  noMessagesSent: number;
  dateLastMessageSent: number;
  dateConnected: number;
  origin?: string;
  version?: string;
  publicIp?: string;
  ws: WebSocket;
  heartbeatCheckStatus: boolean;
  isAlive: boolean;
  instanceNo: number;
  heartbeatHandle: NodeJS.Timeout;
  nextId: number;
  private responses: any;
  lastMemory: MemoryStatus;

  constructor(log: Logger, ws: WebSocket) {
    super();
    this.log = log;
    this.ws = ws;
    this.init = true;
    this.heartbeatCheckStatus = true;
    this.isAlive = true;
    this.origin = '';

    this.noMessagesSent = 0;
    this.noMessagesReceived = 0;
    this.dateLastMessageReceived = 0;
    this.dateLastMessageSent = 0;
    this.dateConnected = Date.now();

    this.instanceNo = instanceNo++;

    this.nextId = 1;
    this.lastMemory = { memFree: 0, memMitm: 0, memStart: 0 };

    ws.on('message', (data: string) => this.received(data));
    ws.on('close', () => this.disconnected());
    ws.on('pong', () => this.heartbeat());

    this.heartbeatHandle = setInterval(() => this.checkHeartbeat(), 30000);
  }

  received(message: string) {
    this.log.debug(`${this.deviceId}: <MITMC ${message}`);

    let msg;
    try {
      msg = JSON.parse(message);
    } catch {
      // Do nothing
    }

    if (typeof msg !== 'object' || Array.isArray(msg) || msg == null) {
      this.log.error(`Device /control - error decoding message, disconnecting`);
      this.ws.close();
      return;
    }

    this.dateLastMessageReceived = Date.now();
    this.dateLastMessageSent = Date.now();

    if (this.init) {
      this.deviceId = msg.deviceId;
      this.version = msg.version;
      this.origin = msg.origin;
      this.publicIp = msg.publicIp;
      this.noMessagesSent = 0;
      this.noMessagesReceived = 0;
      this.responses = {};

      this.emit('init', this, message);
      this.init = false;
    } else {
      const promise = this.responses[msg.id];
      if (promise) {
        delete this.responses[msg.id];
        if (msg.status == 200) {
          this.log.debug(`${this.deviceId}: <MITMC Received job response message ${message.toString()}`);

          promise.resolve(msg.body);
        } else {
          this.log.warn(`${this.deviceId}: <MITMC Received rejection message ${message.toString()}`);
          promise.reject(`Status ${msg.status} ${msg.body?.errorReason ?? ''}`);
        }
      } else {
        this.log.warn(`${this.deviceId}: <MITMC Unrecognized response ${message.toString()}`);
      }
    }
  }

  send(message: string) {
    this.log.debug(`${this.deviceId}: DEVICEC> ${message}`);
    this.noMessagesSent++;
    this.dateLastMessageSent = Date.now();
    this.ws.send(message.toString());
  }

  heartbeat() {
    this.heartbeatCheckStatus = true;
  }

  checkHeartbeat() {
    if (!this.heartbeatCheckStatus) {
      // Pong has not been received in last interval seconds
      this.log.warn(`${this.deviceId}/${this.instanceNo}: DEVICE - No response to ping - forcing disconnect`);
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();

      return;
    }

    this.heartbeatCheckStatus = false;
    this.ws.ping();
  }

  disconnected() {
    this.heartbeatCheckStatus = false;
    this.isAlive = false;
    clearInterval(this.heartbeatHandle);

    this.emit('disconnected', this);
  }

  async getMemoryUsage() {
    //{"id": 7, "method": "getMemoryUsage", "payload": null}
    //< {"id":7,"status":200,"body":{"memFree":123, ...}}

    const memory = await this.executeCommand<MemoryStatus>('getMemoryUsage', null, 5000);
    if (typeof memory === 'object' && !Array.isArray(memory) && memory != null) {
      this.lastMemory = memory; // spy on result
    }
    return memory;
  }

  async getScreenSize() {
    //{"id": 7, "method": "getScreenSize", "payload": null}
    //< {"id":7,"status":200,"body":{"width":1080,"height":1920}}

    return this.executeCommand('getScreenSize', null, 5000);
  }

  async restartApp() {
    return this.executeCommand('restartApp', null, 5000);
  }

  async reboot() {
    return this.executeCommand('reboot', null, 5000);
  }

  async ptcLogin(username: string, password: string) {
    return this.executeCommand<{ token: string }>('performLogin', { username, password }, 60000);
  }

  async getLogcat(): Promise<Buffer> {
    const { zipData } = await this.executeCommand<{ zipData: string }>('getLogcat', null, 30000);

    return Buffer.from(zipData, 'base64');
  }

  async runJob(command: string) {
    return this.executeCommand<{ commandResult: string }>('runJob', { command: command }, 12000);
  }

  async executeCommand<T>(method: string, payload: any, timeout: number): Promise<T> {
    const id = this.nextId++;

    const command = {
      id: id,
      method: method,
      payload: payload,
    };

    this.send(JSON.stringify(command));
    this.responses[id] = new Deferred();

    setTimeout(() => {
      if (this.responses[id]) {
        this.log.warn(`${this.deviceId}: <MITMC Timeout to request ${JSON.stringify(command)}`);
        this.responses[id].reject('Timeout');
      }
    }, timeout);

    return this.responses[id].promise;
  }

  serialize(): DeviceControlDTO {
    return {
      dateLastMessageReceived: this.dateLastMessageReceived,
      dateLastMessageSent: this.dateLastMessageSent,
      deviceId: this.deviceId,
      init: this.init,
      instanceNo: this.instanceNo,
      heartbeatCheckStatus: this.heartbeatCheckStatus,
      isAlive: this.isAlive,
      lastMemory: this.lastMemory,
      nextId: this.nextId,
      noMessagesReceived: this.noMessagesReceived,
      noMessagesSent: this.noMessagesSent,
      origin: this.origin,
      version: this.version,
      dateConnected: this.dateConnected,
      publicIp: this.publicIp,
    };
  }
}
