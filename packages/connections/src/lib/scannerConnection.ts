import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { Logger } from 'tslog';
import { MitmWorkerConnection } from './mitmWorkerConnection';
import { DTO } from './utils/type';
import { RotomProtos } from './utils/mitmProto';
import MitmRequest = RotomProtos.MitmRequest;
//import MitmCommand = RotomProtos.MitmCommand;

let instanceNo = 0;

export type ScannerConnectionDTO = Omit<DTO<ScannerConnection>, 'ws' | 'log' | 'heartbeatHandle' | 'mitmConnection'>;

export class ScannerConnection extends EventEmitter {
  _mitm_disconnect_handler: () => void;
  _mitm_message_handler: (data: ArrayBuffer) => void;
  _ws_close_handler: () => void;
  _ws_message_handler: (data: ArrayBuffer) => void;
  mitmConnection: MitmWorkerConnection;
  ws: WebSocket;
  log: Logger;
  heartbeatHandle: NodeJS.Timer;
  dateLastMessageSent: number;
  instanceNo: number;
  workerName: string;
  isAlive: boolean;
  loginListener: number;

  constructor(log: Logger, ws: WebSocket, mitmConnection: MitmWorkerConnection) {
    super();
    this.ws = ws;
    this.log = log;
    this.dateLastMessageSent = Date.now();
    this.isAlive = true;
    this.workerName = '<unknown>';

    this.loginListener = 20;
    this.instanceNo = instanceNo++;

    this._ws_message_handler = (data: ArrayBuffer) => this.#handleScannerMessage(data);
    this._ws_close_handler = () => this.#handleScannerDisconnection();
    ws.on('message', this._ws_message_handler);
    ws.on('close', this._ws_close_handler);
    ws.on('pong', () => this.heartbeat());

    this.mitmConnection = mitmConnection;
    this._mitm_message_handler = (data: ArrayBuffer) => this.#handleMitmMessage(data);
    this._mitm_disconnect_handler = () => this.#handleMitmDisconnection();
    this.mitmConnection.on('received', this._mitm_message_handler);
    this.mitmConnection.on('disconnected', this._mitm_disconnect_handler);

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
    return this.mitmConnection.workerId as string;
  }

  /**
   * origin of connected Mitm device
   * @returns {string}
   */
  get origin() {
    return this.mitmConnection.origin;
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

    this.mitmConnection.send(message);
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

  #handleScannerDisconnection() {
    this.isAlive = false;
    clearInterval(this.heartbeatHandle);

    // Tell users scanner is disconnected
    this.emit('disconnected', this);
    this.#disconnectFromMitmWebsocket();
  }

  /**
   * Disconnect scanner
   */
  disconnect() {
    this.#disconnectFromMitmWebsocket();
    this.ws.close(3000, 'Device has been disconnected');
  }

  /**
   * Disconnect associated mitm
   */
  disconnectMitm() {
    this.mitmConnection.ws.close(3005, 'Scanner disconnected');
  }

  #disconnectFromMitmWebsocket() {
    this.mitmConnection.removeListener('received', this._mitm_message_handler);
    this.mitmConnection.removeListener('disconnected', this._mitm_disconnect_handler);
  }

  heartbeat() {
    this.isAlive = true;
  }

  checkHeartbeat() {
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

    this.isAlive = false;
    this.ws.ping();
  }

  serialize(): ScannerConnectionDTO {
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
