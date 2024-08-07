const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config();
const path = require('path');

// Define log directory
const logDirectory = path.join(__dirname, 'logs');

// Create a transport for daily log rotation
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-app.log`,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

// Create a transport for error logs with daily rotation
const dailyRotateErrorFileTransport = new transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-error.log`,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error'
});

// Define custom formats
const customFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, service, ...meta }) => {
    return `${timestamp} [${service || 'app'}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
  })
);

// Create logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    dailyRotateFileTransport,
    dailyRotateErrorFileTransport,
    new transports.File({ filename: `${logDirectory}/combined.log`, level: 'info' })
  ]
});

// Add console transport for non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: customFormat
  }));
}

// Add integration with Loggly if API key and subdomain are available
if (process.env.LOGGLY_TOKEN && process.env.LOGGLY_SUBDOMAIN) {
  require('winston-loggly-bulk');
  logger.add(new transports.Loggly({
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: ['Winston-NodeJS'],
    json: true,
    level: 'info'
  }));
}

module.exports = logger;
