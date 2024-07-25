import pgPromise from 'pg-promise';
import "dotenv/config.js";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './src/settings.js';
import { getLoggerInstance } from './src/middlewares/logger.js';

const logger =getLoggerInstance()

const pgp = pgPromise();
const db = pgp({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const seedData = async () => {
  try {
    logger.info("Connected to the database");

    // await db.none('DROP TABLE IF EXISTS polygons');

    await db.none(`
      CREATE TABLE polygons-test (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        coordinates JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        session_id VARCHAR(255) NOT NULL
      )
    `);

    await db.none(`
      INSERT INTO polygons (name, coordinates, session_id)
      VALUES 
        ('Polygon 1', '[[-74.74444580078256, 40.046321674363924], [-74.62634277343851, 39.841012416331466], [-74.27615356445438, 40.084157534017294], [-74.74444580078256, 40.046321674363924]]', 'test'),
        ('Polygon 2', '[[-74.73373413085938, 40.01852307109793], [-74.515869140625, 39.8952926107485], [-74.32586669921875, 40.07807142745009], [-74.73373413085938, 40.01852307109793]]', 'test'),
        ('Polygon 3', '[[-74.73373413085938, 40.01852307109793], [-74.515869140625, 39.8952926107485], [-74.32586669921875, 40.07807142745009], [-74.73373413085938, 40.01852307109793]]', 'test')

    `);

    logger.info("Seed data inserted successfully");
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
  } finally {
    pgp.end();
    logger.info("Disconnected from the database");
  }
};

await seedData();
