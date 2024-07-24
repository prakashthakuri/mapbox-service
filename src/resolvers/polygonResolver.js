import databaseConnection from "../models/index.js"

const {Polygon} = databaseConnection

const validatePolygon = (coordinates) => {
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
        throw new Error("A polygon must have at least 3 coordinates.");
      }
}
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
            validatePolygon(input.coordinates);
            const newPolygon = await Polygon.create(input)
            console.log(newPolygon);
            return newPolygon
        }
    }
}