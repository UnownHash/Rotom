import { createServer, Model, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { StatusDTO, WorkerDTO, MitmControlDTO } from '@rotom/types';

const getRecentTimestamp = (): number => {
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  return faker.date.between(new Date(), new Date()).getTime();
};

export const makeServer = ({ environment = 'test' } = {}) => {
  return createServer({
    environment,

    models: {
      device: Model.extend<Partial<MitmControlDTO>>({ version: '15' }),
      worker: Model.extend<Partial<WorkerDTO>>({}),
    },

    seeds(server) {
      server.createList('device', 10);
      server.createList('worker', 50);
    },

    factories: {
      device: Factory.extend<Partial<MitmControlDTO>>({
        dateLastMessageReceived() {
          return getRecentTimestamp();
        },
        dateLastMessageSent() {
          return getRecentTimestamp();
        },
        deviceId() {
          return faker.vehicle.vrm();
        },
        isAlive() {
          return faker.datatype.boolean();
        },
        lastMemory() {
          return {
            memFree: faker.datatype.number(),
            memMitm: faker.datatype.number(),
            memStart: faker.datatype.number(),
          };
        },
        origin() {
          return faker.animal.insect();
        },
        version() {
          return '15';
        },
      }),
      worker: Factory.extend<Partial<WorkerDTO>>({
        deviceId() {
          return faker.vehicle.vrm();
        },
        isAllocated() {
          return faker.datatype.boolean();
        },
        workerId(i) {
          return faker.vehicle.vrm() + `${i}`;
        },
        mitm(i) {
          return {
            dateLastMessageReceived: getRecentTimestamp(),
            dateLastMessageSent: getRecentTimestamp(),
            init: faker.datatype.boolean(),
            instanceNo: 0,
            isAlive: faker.datatype.boolean(),
            noMessagesReceived: 1,
            noMessagesSent: 1,
            origin: 'none',
            traceMessages: faker.datatype.boolean(),
            version: '15',
            workerId: faker.vehicle.vrm() + `${i}`,
            deviceId: faker.vehicle.vrm(),
            userAgent: ""
          };
        },
      }),
    },

    routes() {
      this.namespace = 'api';

      this.get('/status', (schema): StatusDTO => {
        return { devices: schema.db['devices'], workers: schema.db['workers'] };
      });

      // this.get('/job/status', (): JobsStatusDTO => {
      //   return {
      //     '1': { executionComplete: true, success: true, result: 'root' },
      //     '12': { executionComplete: true, success: true, result: 'root' },
      //     '2': { executionComplete: true, success: true, result: 'root' },
      //     '3': { executionComplete: true, success: true, result: 'root' },
      //   };
      // });

      this.passthrough('/job/**');
    },
  });
};
