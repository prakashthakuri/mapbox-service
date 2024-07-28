import express from 'express';
import cors from 'cors';
import { setupApolloServer } from './src//middlewares/apolloServer.js';
import "dotenv/config.js";
import databaseConnection from './src/models/index.js';
import { getLoggerInstance } from './src/middlewares/logger.js';

const port = process.env.PORT || 8080
const app = express()

const corsOptions = {
  origin: 'https://master.d6jtn3gf9p3oj.amplifyapp.com/', 
  optionsSuccessStatus: 200,
};

const logger = getLoggerInstance()
app.use(cors(corsOptions), express.json())



app.get('/live', (req, res) => {
  res.send(`Server is live ${req.sessionId}`)
})
const apolloGraphQLMiddleware = await setupApolloServer();
app.use('/graphql' , apolloGraphQLMiddleware);

app.listen(port, async () => {
  logger.info(`MapBox-service is running on port ${port}`)
  try {
    await databaseConnection.sequelize.authenticate();
   logger.info('Connection to the database has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error);

  }
});

