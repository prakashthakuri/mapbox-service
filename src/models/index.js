import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../settings.js";
import PolygonModel from "./polygonModel.js";


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    // this is to fix pg_hba.conf
    // https://stackoverflow.com/questions/25000183/node-js-postgresql-error-no-pg-hba-conf-entry-for-host
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            }
    }
})

const Polygon = PolygonModel(sequelize)

const databaseConnection = {
    sequelize,
    Sequelize,
    Polygon
}

export default databaseConnection