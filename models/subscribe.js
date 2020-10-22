'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscribe.belongsTo(models.User)
      Subscribe.belongsTo(models.Location)
    }
  };
  Subscribe.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,  
        notNull: {
          msg: 'data didnt have UserId'
        }
      }
    },
    LocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,  
        notNull: {
          msg: 'data didnt have LocationId'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Subscribe',
  });
  return Subscribe;
};