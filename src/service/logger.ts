import ecsFormat from '@elastic/ecs-winston-format';
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});
