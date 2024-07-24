import { polygonResolver } from "./polygonResolver.js";

const resolvers = {
    Query: {
        ...polygonResolver.Query
    },
    Mutation: {
        ...polygonResolver.Mutation
    }
}