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
              field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
            },
    }, {
      tableName: 'polygons',
      timestamps: true,
    });
  
    Polygon.beforeUpdate((polygon) => {
      polygon.updatedAt = new Date();
    });
  
    return Polygon;
  };
  
  export default PolygonModel;
  