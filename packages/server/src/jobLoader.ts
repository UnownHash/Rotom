import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { Job } from '@rotom/types';
import { Logger } from 'winston';

export class Jobs {
  jobs: Record<string, Job>;

  constructor() {
    this.jobs = {};
  }

  getById(id: string): Job {
    return this.jobs[id];
  }

  loadJobs(newJobs: Job[]) {
    this.jobs = Object.fromEntries(newJobs.map((job) => [job.id, job]));
  }
}

export const jobs = new Jobs();

export class JobLoader {
  log: Logger;

  constructor(log: Logger) {
    this.log = log;
  }

  load() {
    const dirpath = './jobs';

    const filesList = fs.readdirSync(dirpath).filter((e) => path.extname(e).toLowerCase() === '.json');

    let newJobs: Job[] = [];

    for (const filename of filesList) {
      let jobAddition;
      try {
        const jobText = fs.readFileSync(path.join(dirpath, filename), 'utf8');
        jobAddition = JSON.parse(jobText);
      } catch (err) {
        const error = err as Error;
        throw new Error(`jobs/${filename} - ${error.message}`);
      }
      newJobs = newJobs.concat(jobAddition);
    }

    this.log.info(`Loaded ${newJobs.length} jobs`);
    jobs.loadJobs(newJobs);
  }

  watch() {
    chokidar
      .watch('./jobs/*', {
        awaitWriteFinish: true,
      })
      .on('change', () => {
        this.load();
      });
  }
}
