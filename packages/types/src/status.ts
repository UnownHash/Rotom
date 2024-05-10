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

export type DeviceWithLoadDTO = DeviceControlDTO & {
  load: {
    percent: number;
    allocated: number;
    total: number;
  };
};

export interface TransformedStatusDTO extends StatusDTO {
  devices: DeviceWithLoadDTO[];
}
