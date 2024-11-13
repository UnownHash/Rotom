import { EventEmitter, once } from 'events';
import { Logger } from 'winston';
import { WebSocket } from 'ws';
import { DeviceWorkerConnection } from './deviceWorkerConnection';
import { RotomProtos } from './utils/mitmProto';
import { DTO } from './utils/type';
import MitmRequest = RotomProtos.MitmRequest;
//import MitmCommand = RotomProtos.MitmCommand;

let instanceNo = 0;

export type ControllerConnectionDTO = Omit<
  DTO<ControllerConnection>,
  'ws' | 'log' | 'heartbeatHandle' | 'deviceWorkerConnection'
>;

export class ControllerConnection extends EventEmitter {
  _device_disconnect_handler: () => void;
  _device_message_handler: (data: ArrayBuffer) => void;
  _ws_close_handler: () => void;
  _ws_message_handler: (data: ArrayBuffer) => void;
  deviceWorkerConnection: DeviceWorkerConnection;
  ws: WebSocket;
  log: Logger;
  heartbeatHandle: NodeJS.Timer;
  dateLastMessageSent: number;
  instanceNo: number;
  workerName: string;
  isAlive: boolean;
  loginListener: number;

  constructor(log: Logger, ws: WebSocket, deviceWorkerConnection: DeviceWorkerConnection) {
    super();
    this.ws = ws;
    this.log = log;
    this.dateLastMessageSent = Date.now();
    this.isAlive = true;
    this.workerName = '<unknown>';

    this.loginListener = 20;
    this.instanceNo = instanceNo++;

    this._ws_message_handler = (data: ArrayBuffer) => this.#handleScannerMessage(data);
    this._ws_close_handler = () => this.#handleControllerDisconnection();
    ws.on('message', this._ws_message_handler);
    ws.on('close', this._ws_close_handler);
    ws.on('pong', () => this.heartbeat());

    this.deviceWorkerConnection = deviceWorkerConnection;
    this._device_message_handler = (data: ArrayBuffer) => this.#handleMitmMessage(data);
    this._device_disconnect_handler = () => this.#handleMitmDisconnection();
    this.deviceWorkerConnection.on('received', this._device_message_handler);
    this.deviceWorkerConnection.on('disconnected', this._device_disconnect_handler);

    this.heartbeatHandle = setInterval(() => this.checkHeartbeat(), 30000);
  }

  /**
   * Handle incoming message from Mitm device
   * @param message
   */
  #handleMitmMessage(message: ArrayBuffer) {
    // Simple send to scanner
    this.send(message);
  }

  /**
   * Handle Mitm device disconnection
   */
  #handleMitmDisconnection() {
    this.disconnect();
  }

  /**
   * deviceId of connected Mitm device
   * @returns {string}
   */
  get workerId(): string {
    return this.deviceWorkerConnection.workerId as string;
  }

  /**
   * origin of connected Mitm device
   * @returns {string}
   */
  get origin() {
    return this.deviceWorkerConnection.origin;
  }

  /**
   * Handle message from scanner
   * @param message
   */
  #handleScannerMessage(message: ArrayBuffer) {
    //this.log.debug(`D< ${this.workerName} ${message}`);

    if (this.loginListener > 0) {
      this.loginListener--;
      if (this.loginListener === 0) {
        this.workerName = '<unknown - not seen>';
      }
      try {
        const rc = MitmRequest.decode(new Uint8Array(message));
        if (rc.method == MitmRequest.Method.LOGIN && rc.payload === 'loginRequest') {
          this.workerName = `${rc.loginRequest?.workerId ?? '<unknown>'}/${rc.loginRequest?.username ?? '<unknown>'}`;
          //this.workerName = `<unknown>/${rc.loginRequest?.username ?? '<unknown>'}`;
          this.loginListener = 0;
        }
      } catch (e) {
        this.log.warn(
          `${this.workerName}/${this.instanceNo}->${this.workerId}: Scanner - error decoding request packet looking for login`,
        );
      }
    }

    this.deviceWorkerConnection.send(message);
  }

  /**
   * Send message to scanner
   * @param message
   */
  send(message: ArrayBuffer) {
    this.dateLastMessageSent = Date.now();

    //this.log.debug(`D> ${this.workerName} ${message}`);
    this.ws.send(message, { binary: true });
  }

  #handleControllerDisconnection() {
    this.isAlive = false;
    clearInterval(this.heartbeatHandle);

    // Tell users scanner is disconnected
    this.emit('disconnected', this);
    this.#disconnectFromDeviceWebsocket();
  }

  /**
   * Disconnect scanner
   */
  disconnect() {
    this.#disconnectFromDeviceWebsocket();
    this.ws.close(3000, 'Device has been disconnected');
  }

  /**
   * Disconnect associated device
   */
  disconnectDevice() {
    this.deviceWorkerConnection.ws.close(3005, 'Controller disconnected');
  }

  #disconnectFromDeviceWebsocket() {
    this.deviceWorkerConnection.removeListener('received', this._device_message_handler);
    this.deviceWorkerConnection.removeListener('disconnected', this._device_disconnect_handler);
  }

  heartbeat() {
    //this.isAlive = true;
    this.emit('isAlive', true);
  }

  async checkHeartbeat() {
    if (!this.isAlive) {
      // Pong has not been received in last interval seconds
      this.log.warn(
        `${this.workerName}/${this.instanceNo}->${this.workerId}: Scanner - No response to ping - forcing disconnect`,
      );
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();

      return;
    }

    if (Date.now() - this.dateLastMessageSent > 300000) {
      this.log.warn(
        `${this.workerName}/${this.instanceNo}->${this.workerId}: Scanner - No messages sent in 5min - forcing disconnect`,
      );
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
      this.log.warn(
        `${this.workerName}/${this.instanceNo}->${this.workerId}: Scanner - No response to ping - forcing disconnect: ${err}`,
      );
      clearInterval(this.heartbeatHandle);
      this.ws.terminate();
    }
    this.isAlive = isAlive;
  }

  serialize(): ControllerConnectionDTO {
    return {
      dateLastMessageSent: this.dateLastMessageSent,
      instanceNo: this.instanceNo,
      isAlive: this.isAlive,
      loginListener: this.loginListener,
      origin: this.origin,
      workerId: this.workerId,
      workerName: this.workerName,
    };
  }
}
