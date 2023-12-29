import { default as originalConfig } from 'config';

interface Config {
  deviceListener: {
    port: number;
    secret: string;
  };
  controllerListener: {
    port: number;
    secret: string;
  };
  client: {
    port: number;
    host: string;
  };
  logging: {
    save: boolean;
    maxSize: number;
    maxAge: number;
    level: string;
    consoleStatus: boolean;
  };
  monitor: {
    enabled: boolean;
    reboot: boolean;
    minMemory: number;
    maxMemStartMultiple: number;
    maxMemStartMultipleOverwrite: { [key: string]: number };
    deviceCooldown: number;
  };
}

export const config = originalConfig as unknown as Config;
