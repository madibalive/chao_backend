import pino from 'pino';
import { getResponseTime } from './utils';

import { Request, Response, NextFunction } from 'express';

const config: pino.LoggerOptions = {
  level: 'debug',
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
};

let logger: pino.BaseLogger;
if (process.env.NODE_ENV !== 'production') {
  logger = pino({
    ...config,
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  });
} else {
  logger = pino(
    config,
    pino.destination({
      dest: 'debug.log',
      sync: false,
    }),
  );
}

const apiLogger = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    const delta = getResponseTime(process.hrtime()).toLocaleString();
    const message = `${req.method} ${req.url} (${delta} ms)`;
    logger.debug(message);
    next();
  })();
};

//! Do-not rename logger and apiLogger
export { logger, apiLogger };
