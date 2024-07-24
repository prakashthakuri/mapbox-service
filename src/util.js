import { getLoggerInstance } from "./middlewares/logger.js";

const logger= getLoggerInstance()
export const validatePolygon = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    logger.error("Invalid input. Coordinates must be a non-empty array.");
    throw new Error("Invalid input. Coordinates must be a non-empty array.");
  }

  coordinates.forEach(ring => {
    // if (!Array.isArray(ring) || ring.length < 4) {
    //   logger.error("Invalid Polygon. Each ring of a polygon must have at least 4 coordinates.");
    //   throw new Error("Invalid Polygon. Each ring of a polygon must have at least 4 coordinates.");
    // }

    // Ensure the first and last coordinates are the same to close the polygon
    const firstCoord = ring[0];
    const lastCoord = ring[ring.length - 1];
    if (firstCoord[0] !== lastCoord[0] || firstCoord[1] !== lastCoord[1]) {
      logger.error("Invalid Polygon. The first and last coordinates of each ring must be the same.");
      throw new Error("Invalid Polygon. The first and last coordinates of each ring must be the same.");
    }

    // Ensure all coordinates are valid numbers
    // ring.forEach(coord => {
    //   if (
    //     !Array.isArray(coord) ||
    //     coord.length !== 2 ||
    //     typeof coord[0] !== 'number' ||
    //     typeof coord[1] !== 'number'
    //   ) {
    //     logger.error("Invalid Polygon. Each coordinate must be an array of two numbers.");
    //     throw new Error("Invalid Polygon. Each coordinate must be an array of two numbers.");
    //   }
    // });
  });
};
