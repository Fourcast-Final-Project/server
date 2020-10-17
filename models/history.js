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
    }
  };
  History.init({
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "must enter location's name"
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "invalid history's time"
        },
        notEmpty: {
          args: true,
          msg: "invalid history's time"
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
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};