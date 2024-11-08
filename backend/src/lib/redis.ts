import { createClient } from 'redis';
import config from '../config';
import { logger } from '../utils/logger';

const redis = createClient({
  url: config.redisUrl
});

redis.on('error', (error) => {
  logger.error('Redis Client Error:', error);
});

redis.on('connect', () => {
  logger.info('Redis Client Connected');
});

export { redis };