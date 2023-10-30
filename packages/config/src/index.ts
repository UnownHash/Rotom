import { default as originalConfig } from 'config';

interface Config {
  deviceListener: {
    port: number;
  };
  controllerListener: {
    port: number;
  };
  client: {
    port: number;
    host: string;
  };
  logging: {
    save: boolean;
    debug: boolean;
    consoleStatus: boolean;
  };
  monitor: {
    reboot: boolean;
    minMemory: number;
    maxMemStartMultiple: number;
    maxMemStartMultipleOverwrite: { [key: string]: number };
    deviceCooldown: number;
  };
}

export const config = originalConfig as unknown as Config;
