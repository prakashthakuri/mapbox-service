import { DataTypes } from 'sequelize';

const PolygonModel = (sequelize) => {
    const Polygon = sequelize.define('Polygon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      coordinates: {
        type: DataTypes.JSONB,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('coordinates');
          // Ensure that coordinates are returned as a nested array
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        }

      },
      sessionId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'session_id'

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
      createdAt: 'created_at',
      updatedAt: 'updated_at',
        });
  
    Polygon.beforeUpdate((polygon) => {
      polygon.updatedAt = new Date();
    });
  
    return Polygon;
  };
  
  export default PolygonModel;
  