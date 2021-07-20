'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'isMentor')
    await queryInterface.removeColumn('users', 'field')
    await queryInterface.addColumn('users', 'bio', {
      type: Sequelize.STRING(280),
      allowNull: true
    })
    await queryInterface.addColumn('users', 'passions', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('users', 'currentTitle', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('users', 'currentCompany', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('users', 'yearsInIndustry', {
      type: Sequelize.ENUM('0-1', '1-3', '3-5', '5-10', '10+'),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'isMentor', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
    await queryInterface.addColumn('users', 'field', {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.removeColumn('users', 'bio')
    await queryInterface.removeColumn('users', 'passions')
    await queryInterface.removeColumn('users', 'currentTitle')
    await queryInterface.removeColumn('users', 'currentCompany')
    await queryInterface.removeColumn('users', 'yearsInIndustry')
  }
}
