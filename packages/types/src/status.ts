import type { ControllerConnectionDTO, DeviceControlDTO, DeviceWorkerDTO } from '@rotom/connections';

export { ControllerConnectionDTO, DeviceControlDTO, DeviceWorkerDTO };

export type WorkerDTO = {
  workerId: string;
  deviceId?: string;
  controller?: ControllerConnectionDTO;
  isAllocated: boolean;
  worker: DeviceWorkerDTO;
};

export interface StatusDTO {
  workers: WorkerDTO[];
  devices: DeviceControlDTO[];
}
