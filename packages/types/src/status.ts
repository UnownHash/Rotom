import type { ScannerConnectionDTO, MitmControlDTO, MitmWorkerDTO } from '@rotom/connections';

export { ScannerConnectionDTO, MitmControlDTO, MitmWorkerDTO };

export type WorkerDTO = {
  deviceId?: string;
  scanner?: ScannerConnectionDTO;
  isAllocated: boolean;
  mitm: MitmWorkerDTO;
  workerId: string;
};

export interface StatusDTO {
  workers: WorkerDTO[];
  devices: MitmControlDTO[];
}
