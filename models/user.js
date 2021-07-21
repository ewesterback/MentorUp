'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Thread, {
        as: 'mentor',
        foreignKey: 'mentorId'
      })
      User.hasMany(models.Thread, {
        as: 'mentee',
        foreignKey: 'menteeId'
      })
      User.hasMany(models.Message, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      availableToMentor: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      bio: {
        type: DataTypes.STRING(280),
        allowNull: true
      },
      passions: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currentTitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currentCompany: {
        type: DataTypes.STRING,
        allowNull: true
      },
      yearsInIndustry: {
        type: DataTypes.ENUM('0-1', '1-3', '3-5', '5-10', '10+'),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
