import { createClient } from 'redis';
import { REDIS_URL } from '../settings.js';

let redisClient;

try {
  const redisUrl = REDIS_URL;
  redisClient = createClient({
    url: redisUrl,
    socket: {
      tls: true,
      rejectUnauthorized: false 
    }
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
    redisClient = null; 
  });

  await redisClient.connect();
  console.log('Connected to Redis successfully.');
} catch (err) {
  console.error('Failed to connect to Redis:', err);
  redisClient = null;
}

export default redisClient;
