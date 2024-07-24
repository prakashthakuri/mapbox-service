import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { resolvers } from '../resolvers/index.js';
import { getLoggerInstance } from './logger.js';

const logger = getLoggerInstance()

export async function setupApolloServer() {
  logger.info('Entering apollo server setup function')

  try {
    const typeDefs = await readFile(new URL('../schema/polygon.graphql', import.meta.url), 'utf-8');
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers
  });
    await apolloServer.start();
    
    logger.info('Apollo server started successfully');
    return apolloMiddleware(apolloServer);
  } catch (error) {
    logger.error(`Error setting up Apollo server: ${error.message}`, { error });
    throw error; 
  }
}