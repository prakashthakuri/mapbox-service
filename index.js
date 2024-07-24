import express from 'express';
import cors from 'cors';
import { setupApolloServer } from './src//middlewares/apolloServer.js';
import * as dotenv from 'dotenv'
import databaseConnection from './src/models/index.js';
import { sessionMiddleware } from './src/middlewares/sessionMiddleware.js';
import { getLoggerInstance } from './src/middlewares/logger.js';

dotenv.config();

const app = express()
const logger = getLoggerInstance()
app.use(cors(), express.json())

const port = 8080
app.use(sessionMiddleware)
app.get('/live', (req, res) => {
  res.send('Server is live')
})
const apolloGraphQLMiddleware = await setupApolloServer();
app.use('/graphql', apolloGraphQLMiddleware);

app.listen(port, async () => {
  logger.info(`MapBox-service is running on port ${port}`)
  try {
    await databaseConnection.sequelize.authenticate();
   logger.info('Connection to the database has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error);

  }
});

