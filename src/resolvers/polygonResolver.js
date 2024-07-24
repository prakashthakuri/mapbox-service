import databaseConnection from "../models/index.js"

const {Polygon} = databaseConnection
export const polygonResolver = {
    Query: {
        getPolygons: async () => {
            console.log("getting polygons")
            const polygons = await Polygon.findAll()
            console.log(polygons, "data should be here")
            return polygons;
        }
    },
    Mutation: {
        addPolygon: async (_, {input}) => {
            console.log(input, "input")
            const newPolygon = await Polygon.create(input)
            console.log(newPolygon);
            return newPolygon
        }
    }
}