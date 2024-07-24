import { DataTypes } from 'sequelize';

const PolygonModel = (sequelize) => {
    const Polygon = sequelize.define('Polygon', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'polygons',
      timestamps: true,
    });
  
    Polygon.beforeUpdate((polygon, options) => {
      polygon.updatedAt = new Date();
    });
  
    return Polygon;
  };
  
  export default PolygonModel;
  