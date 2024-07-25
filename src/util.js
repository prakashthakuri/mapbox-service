import { getLoggerInstance } from "./middlewares/logger.js";
import * as turf from '@turf/turf';
const logger= getLoggerInstance()

export const validatePolygon = (coordinates) => {
  if (coordinates.length > 0) {
    let lines = coordinates[0];

    // Remove the duplicate closing point if present
    if (lines[0][0] === lines[lines.length - 1][0] && lines[0][1] === lines[lines.length - 1][1]) {
      lines = lines.slice(0, -1);
    }

    if (lines.length >= 3) {
      const polygon = turf.polygon([lines.concat([lines[0]])]); // Ensure the polygon is closed by appending the first coordinate at the end
      const isValid = turf.booleanValid(polygon);
      logger.info('polygon is validated!')
      return isValid;
    } else {
      logger.error("Invalid polygon.  A polygon must have at least 3 points.");

      throw new Error('Invalid polygon. A polygon must have at least 3 points.');
    }
  } else {
    logger.error("Invalid input. Coordinates must be a non-empty array.");

    throw new Error('Invalid coordinates. Non-empty array expected.');

  }
}

