import GraphQLJSON from "graphql-type-json";
import { getLoggerInstance } from "../middlewares/logger.js";
import databaseConnection from "../models/index.js";
import { validatePolygon } from "../util.js";
import { v4 as uuidv4 } from 'uuid';
import redisClient from "../middlewares/redis.js";
const { Polygon } = databaseConnection;
const logger = getLoggerInstance();

const CACHE_EXPIRATION = 3600;

export const polygonResolver = {
  JSON: GraphQLJSON,
  Query: {
    generateSessionId: () => {
      const sessionId = uuidv4();
      logger.info(`Generated new sessionId: ${sessionId}`);
      return sessionId;
    },
    getPolygons: async () => {
      logger.info('Query: getPolygons called');
      try {
        const cacheKey = 'polygons';
        
        const cachedPolygons = await redisClient.get(cacheKey);

        if (cachedPolygons) {
          logger.info('Fetched polygons from Redis cache');
          return JSON.parse(cachedPolygons);
        }

        const polygons = await Polygon.findAll({
            order: [['createdAt', 'DESC']]  // this is because the first entries were done using playground and no validator
          });        await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(polygons));
        logger.info('Fetched polygons from database and cached in Redis');
        return polygons;
      } catch (error) {
        logger.error(`Error in getPolygons: ${error.message}`);
        throw new Error('Failed to fetch polygons');
      }
    },
    getPolygonsBySession: async (_, { session_id }) => {
      logger.info('Query: getPolygonsBySession called', { session_id });
      try {
        const cacheKey = `polygons:${session_id}`;
        const cachedPolygons = await redisClient.get(cacheKey);

        if (cachedPolygons) {
          logger.info(`Fetched polygons for session ${session_id} from Redis cache`);
          return JSON.parse(cachedPolygons);
        }

        const polygons = await Polygon.findAll({
            where: { session_id },
            order: [['createdAt', 'DESC']] 
          });        await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(polygons));
        logger.info(`Fetched polygons for session ${session_id} from database and cached in Redis`);
        return polygons;
      } catch (error) {
        logger.error(`Error in getPolygonsBySession: ${error.message}`);
        throw new Error('Failed to fetch polygons by session');
      }
    }
  },
  Mutation: {
    addPolygon: async (_, { input }) => {
      logger.info('Mutation: addPolygon called');
      try {
        validatePolygon(input.coordinates);

        if (!input.session_id) {
          throw new Error('session_id is missing');
        }

        const newPolygon = await Polygon.create({ ...input, sessionId: input.session_id });
        logger.info(`New polygon data has been updated for ${input?.session_id}`);

        // Invalidate cache
        await redisClient.del('polygons');
        await redisClient.del(`polygons:${input.session_id}`);

        return newPolygon;
      } catch (error) {
        logger.error(`Error in adding a new Polygon: ${error.message}`);
        throw new Error('Failed to add polygon');
      }
    },
    updatePolygon: async (_, { id, input, session_id }) => {
      logger.info('Mutation: updatePolygon called with session_id:', session_id);
      try {
        validatePolygon(input.coordinates);
        const polygon = await Polygon.findByPk(id);
        if (!polygon) {
          logger.error(`Polygon not found!`);
          throw new Error("Polygon not found");
        }
        if (polygon.session_id !== session_id) {
          logger.error(`Unauthorized attempt to update polygon`);
          throw new Error("Unauthorized");
        }
        await polygon.update({ ...input, session_id, updated_at: new Date().toISOString() });

        await redisClient.del('polygons');
        await redisClient.del(`polygons:${session_id}`);

        return polygon;
      } catch (error) {
        logger.error(`Error in updating existing Polygon: ${error.message}`);
        throw new Error('Failed to update polygon');
      }
    }
  }
};
