import { polygonResolver } from "./polygonResolver.js";

export const resolvers = {
    Query: {
        ...polygonResolver.Query
    },
    Mutation: {
        ...polygonResolver.Mutation
    }
}