import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '@rotom/config';

const logFormat = winston.format.printf(({ level, timestamp, message, label }) => {
  return `[${timestamp}] [${level.toUpperCase()}] [${label}] ${message}`;
});

const transports = [];

// Main log file transport
if (config.logging.save) {
  const mainTransport = new DailyRotateFile({
    dirname: 'logs',
    filename: 'rotom.log',
    zippedArchive: true,
    maxSize: config.logging.maxSize + 'm', // rotate when file size exceeds x MB
    maxFiles: config.logging.maxAge + 'd', // keep logs for 14 days
    format: winston.format.combine(winston.format.timestamp(), winston.format.label({ label: 'rotom' }), logFormat),
  });
  transports.push(mainTransport);
}

transports.push(new winston.transports.Console());

export const log = winston.createLogger({
  level: config.logging && config.logging.level in winston.config.npm.levels ? config.logging.level : 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.label({ label: 'rotom' }), logFormat),
  transports: transports,
});
