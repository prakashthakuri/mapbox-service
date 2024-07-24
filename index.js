import express from 'express';
import cors from 'cors';
import { setupApolloServer } from './src//middlewares/apolloServer.js';
import * as dotenv from 'dotenv'
import databaseConnection from './src/models/index.js';

dotenv.config();

const app = express()
app.use(cors(), express.json())
const port = 8080

app.get('/live', (req, res) => {
  res.send('Server is live')
})
const apolloGraphQLMiddleware = await setupApolloServer();
app.use('/graphql', apolloGraphQLMiddleware);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await databaseConnection.sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

