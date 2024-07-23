import express from 'express';
import cors from 'cors';
import { setupApolloServer } from './middlewares/apolloServer.js';



const app = express()
app.use(cors(), express.json())
const port = 8080

app.get('/live', (req, res) => {
  res.send('Server is live')
})
const apolloGraphQLMiddleware = await setupApolloServer();
app.use('/graphql', apolloGraphQLMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})