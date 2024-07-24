import { getLoggerInstance } from "./middlewares/logger.js";

const logger= getLoggerInstance()
export const validatePolygon = (coordinates) => {
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
        logger.error("Invalid Polygon. A polygon must have at least 3 coordinates.")
        throw new Error("Invalid Polygon. A polygon must have at least 3 coordinates.");
        
      }
}