'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thread.belongsTo(models.User, {
        as: 'mentor',
        foreignKey: 'mentorId'
      })
      Thread.belongsTo(models.User, {
        as: 'mentee',
        foreignKey: 'menteeId'
      })
    }
  }
  Thread.init(
    {
      mentorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      menteeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Thread',
      tableName: 'threads'
    }
  )
  return Thread
}
