import { MitmControlConnection } from '@rotom/connections';
import { Job, JobStatus } from '@rotom/types';

let jobExecutionNo = 1;

export class JobExecutor {
  jobStatus: Record<string, JobStatus>;

  constructor() {
    this.jobStatus = {};
  }

  runJob(device: MitmControlConnection, job: Job): number {
    const jobNo = jobExecutionNo++;

    this.jobStatus[jobNo] = {
      deviceOrigin: device.origin,
      deviceId: device.deviceId,
      jobId: job.id,
      executionComplete: false,
      success: undefined,
      result: null,
    };
    setTimeout(() => {
      delete this.jobStatus[jobNo];
    }, 600000);

    device
      .runJob(job.exec)
      .then((res) => {
        this.jobStatus[jobNo] = {
          ...this.jobStatus[jobNo],
          executionComplete: true,
          success: true,
          result: res.commandResult,
        };
        return;
      })
      .catch((res) => {
        this.jobStatus[jobNo] = {
          ...this.jobStatus[jobNo],
          executionComplete: true,
          success: false,
          result: res.toString(),
        };
        return;
      });

    return jobNo;
  }

  getStatus(id: number): JobStatus {
    return this.jobStatus[id];
  }
}
