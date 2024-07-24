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
          console.log(polygons)
          return polygons;
                } catch (error) {
          logger.error(`Error in getPolygons: ${error.message}`);
          throw new Error('Failed to fetch polygons');
        }
      },
      getPolygonsBySession: async (_, { sessionId }) => {
        logger.info('Query: getPolygonsBySession called', { sessionId });
        try {
          const polygons = await Polygon.findAll({ where: { sessionId } });
          return polygons;
        } catch (error) {
          logger.error(`Error in getPolygonsBySession: ${error.message}`);
          throw new Error('Failed to fetch polygons by session');
        }
      }
    },
    Mutation: {
      addPolygon: async (_, { input }, {sessionId}) => {
        logger.info('Mutation: addPolygon called');
        console.log(sessionId, "REq")
        try {
          validatePolygon(input.coordinates);
          const newPolygon = await Polygon.create({ ...input, sessionId});
          logger.info(`New polygon data has been updated for ${sessionId} `)
          return newPolygon;
        } catch (error) {
          logger.error(`Error in adding a new Polygon: ${error.message}`);
          throw new Error('Failed to add polygon');
        }
      },
      updatePolygon: async (_, { id, input }, {sessionId}) => {
        try {
          validatePolygon(input.coordinates);
          const polygon = await Polygon.findByPk(id);
          if (!polygon) {
            logger.error(`polygon not found!`)
            throw new Error("Polygon not found");
          }
          await polygon.update(input);
          return polygon;
        } catch(error){
            logger.error(`Error in updating existing Polygon: ${error.message}`);
            throw new Error('Failed to update polygon');
        }
  
  
    }
  }
}