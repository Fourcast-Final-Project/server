'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User)
      History.belongsTo(models.Location)
    }
  };
  History.init({
    LocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,  
        notNull: {
          msg: 'data didnt have LocationId'
        }
      }
    },
    waterLevel: DataTypes.DOUBLE,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "histories must have userId"
        },
        notEmpty: {
          args: true,
          msg: "histories must have userId"
        }
      }
    },
    image: {
     type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};