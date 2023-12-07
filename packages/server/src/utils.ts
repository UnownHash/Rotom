import { Registry, collectDefaultMetrics, Gauge } from 'prom-client';

export const promRegistry = new Registry();
collectDefaultMetrics({ register: promRegistry });

const prefix = 'rotom_';

export const devicesTotalGauge = new Gauge({
  name: prefix + 'devices_total',
  help: 'Devices known regardless of state',
  registers: [promRegistry],
});

export const devicesAliveGauge = new Gauge({
  name: prefix + 'devices_alive',
  help: 'Devices that pass isAlive',
  registers: [promRegistry],
});

export const workersTotalGauge = new Gauge({
  name: prefix + 'workers_total',
  help: 'Workers known regardless of state',
  labelNames: ['origin'],
  registers: [promRegistry],
});

export const workersActiveGauge = new Gauge({
  name: prefix + 'workers_active',
  help: 'Workers that have an active mitm connection',
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

export function valueOrZero(value?: number): number {
  if (value === undefined) {
    return 0;
  }
  return Number.isNaN(value) ? 0 : value;
}
