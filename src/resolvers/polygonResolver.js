import databaseConnection from "../models/index.js"

export const polygonResolver = {
    Query: {
        getPolygons: async () => {
            console.log("getting polygons")
            const polygons = await databaseConnection.Polygon.findAll()
            console.log(polygons, "data should be here")
            return polygons;
        }
    },
    Mutation: {

    }
}