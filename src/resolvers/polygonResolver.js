import GraphQLJSON from "graphql-type-json";
import { getLoggerInstance } from "../middlewares/logger.js";
import databaseConnection from "../models/index.js"
import { validatePolygon } from "../util.js"
import { uuid } from "uuidv4";

const {Polygon} = databaseConnection

const logger = getLoggerInstance();

export const polygonResolver = {
    JSON: GraphQLJSON,
    Query: {
        generateSessionId: () => {
            const sessionId = uuid()
            logger.info(`Generated new sessionId: ${sessionId}`);
            return sessionId;
          },
      getPolygons: async () => {
        logger.info('Query: getPolygons called');
        try {
          const polygons = await Polygon.findAll();
          logger.info(`Fetched polygons from database `)
          return polygons;
                } catch (error) {
          logger.error(`Error in getPolygons: ${error.message}`);
          throw new Error('Failed to fetch polygons');
        }
      },
      getPolygonsBySession: async (_, __, { session_id }) => {
        logger.info('Query: getPolygonsBySession called', { session_id });
        try {
          const polygons = await Polygon.findAll({ where: { session_id } });
          return polygons;
        } catch (error) {
          logger.error(`Error in getPolygonsBySession: ${error.message}`);
          throw new Error('Failed to fetch polygons by session');
        }
      }
    },
    Mutation: {
        addPolygon: async (_, { input}) => {
          logger.info('Mutation: addPolygon called ');
          try {
            validatePolygon(input.coordinates);
            const newPolygon = await Polygon.create({ ...input,  });
            logger.info(`New polygon data has been updated for ${input?.session_id}`);
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
            await polygon.update({ ...input, session_id });
            return polygon;
          } catch (error) {
            logger.error(`Error in updating existing Polygon: ${error.message}`);
            throw new Error('Failed to update polygon');
          }
        }
      }
    };