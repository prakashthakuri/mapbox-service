import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { resolvers } from '../resolvers/index.js';

export async function setupApolloServer() {
  const typeDefs = await readFile(new URL('../schema/polygon.graphql', import.meta.url), 'utf-8');  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  return apolloMiddleware(apolloServer);
}