import { appendFileSync } from 'fs';
import { config } from '@rotom/config';
import { ILogObject, Logger } from 'tslog';

function logToTransport(logObject: ILogObject) {
  appendFileSync('logs/logs.txt', JSON.stringify(logObject) + '\n');
}

export const log: Logger = new Logger({
  name: 'rotom',
  minLevel: config.logging && config.logging.debug ? 'debug' : 'info',
  displayFilePath: 'hidden',
  displayFunctionName: false,
  displayLoggerName: false,
});

if (config.logging.save) {
  log.attachTransport(
    {
      silly: logToTransport,
      debug: logToTransport,
      trace: logToTransport,
      info: logToTransport,
      warn: logToTransport,
      error: logToTransport,
      fatal: logToTransport,
    },
    config.logging && config.logging.debug ? 'debug' : 'info',
  );
}
