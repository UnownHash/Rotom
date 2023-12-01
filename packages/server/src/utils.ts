import { Registry, collectDefaultMetrics, Gauge } from 'prom-client';

export const promRegistry = new Registry();
collectDefaultMetrics({ register: promRegistry });

const prefix = 'rotom_';

export const devicesGauge = new Gauge({
  name: prefix + 'devices',
  help: 'Devices in use',
  registers: [promRegistry],
});

export const workersGauge = new Gauge({
  name: prefix + 'workers',
  help: 'Workers in use',
  labelNames: ['origin'],
  registers: [promRegistry],
});

export const deviceMemoryFree = new Gauge({
  name: prefix + 'device_memory_free',
  help: 'Device Memory Free',
  labelNames: ['origin'],
  registers: [promRegistry],
});

export const deviceMemoryMitm = new Gauge({
  name: prefix + 'device_memory_mitm',
  help: 'Device Memory MITM',
  labelNames: ['origin'],
  registers: [promRegistry],
});

export const deviceMemoryStart = new Gauge({
  name: prefix + 'device_memory_start',
  help: 'Device Memory Start',
  labelNames: ['origin'],
  registers: [promRegistry],
});
