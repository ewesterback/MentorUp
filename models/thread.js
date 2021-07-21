'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
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
