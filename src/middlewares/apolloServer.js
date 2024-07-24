import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { polygonResolver } from '../resolvers/polygonResolver.js';

export async function setupApolloServer() {
  const typeDefs = await readFile(new URL('../schema/polygon.graphql', import.meta.url), 'utf-8');  const apolloServer = new ApolloServer({ typeDefs, polygonResolver });
  await apolloServer.start();
  return apolloMiddleware(apolloServer);
}