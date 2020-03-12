'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Series', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      numViews: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      numLikes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Series');
  }
};