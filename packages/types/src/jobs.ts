export interface Job {
  id: string;
  description: string;
  exec: string;
}

export type JobsDTO = Record<string, Job>;

export interface JobStatus {
  deviceId?: string;
  deviceOrigin?: string;
  jobId: string;
  executionComplete: boolean;
  result: string | null;
  success: boolean | undefined;
}

export type JobsStatusDTO = Record<string, JobStatus>;
