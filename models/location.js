'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Subscribe)
      Location.hasMany(models.History)
    }
  };
  Location.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "must enter location's name"
        }
      }
    },
    waterLevel: DataTypes.DOUBLE,
    latitude: {
      type: DataTypes.DOUBLE,
      validate: {
        max: {
          args: 90,
          msg: 'latitude range must be between -90 up to +90 degrees'
        },
        min: {
          args: -90,
          msg: 'latitude range must be between -90 up to +90 degrees'
        }
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      validate: {
        max: {
          args: 180,
          msg: 'longitude range must be between -180 up to +180 degrees'
        },
        min: {
          args: -180,
          msg: 'longitude range must be between -180 up to +180 degrees'
        }
        
      }
    } 
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};