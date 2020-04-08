'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      alias: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "ETC"
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Files');
  }
};