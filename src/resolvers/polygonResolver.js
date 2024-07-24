import databaseConnection from "../models/index.js"
import { validatePolygon } from "../util.js"

const {Polygon} = databaseConnection


export const polygonResolver = {
    Query: {
        getPolygons: async () => {
            const polygons = await Polygon.findAll()
            return polygons;
        },
        getPolygonsBySession: async (_, { sessionId }) => {
            const polygons = await Polygon.findAll({where: {sessionId}});
            return polygons;
        }
    },
    Mutation: {
        addPolygon: async (_, {input}, {sessionId}) => {
            validatePolygon(input.coordinates);
            const newPolygon = await Polygon.create(...input, sessionId)
            console.log(newPolygon);
            return newPolygon
        }
    }
}