import { createClient } from 'redis';
import { REDIS_URL } from '../settings';


let redisClient;

try {
  redisClient = createClient({
    url: REDIS_URL
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
