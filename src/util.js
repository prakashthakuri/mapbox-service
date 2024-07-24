export const validatePolygon = (coordinates) => {
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
        throw new Error("A polygon must have at least 3 coordinates.");
      }
}