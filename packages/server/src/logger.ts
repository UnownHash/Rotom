import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '@rotom/config';

const logFormat = winston.format.printf(({ level, timestamp, message, label }) => {
  return `[${timestamp}] [${level.toUpperCase()}] [${label}] ${message}`;
});

const transport = new DailyRotateFile({
  dirname: 'logs',
  filename: 'rotom.log',
  zippedArchive: true,
  maxSize: config.logging.maxSize + 'm', // rotate when file size exceeds x MB
  maxFiles: config.logging.maxAge + 'd', // keep logs for 14 days
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.label({ label: 'rotom' }), // Set your logger name
    logFormat,
  ),
});

export const log = winston.createLogger({
  level: config.logging && config.logging.debug ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.label({ label: 'rotom' }), // Set your logger name
    logFormat,
  ),
  transports: [transport],
});
