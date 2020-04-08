'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      size: {
        allowNull: true,
        type: Sequelize.STRING
      },
      width: {
        allowNull: true,
        type: Sequelize.STRING
      },
      height: {
        allowNull: true,
        type: Sequelize.STRING
      },
      color: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tags: {
        allowNull: true,
        type: Sequelize.STRING
      },
      raw: {
        allowNull: true,
        type: Sequelize.STRING
      },
      full: {
        allowNull: true,
        type: Sequelize.STRING
      },
      regular: {
        allowNull: true,
        type: Sequelize.STRING
      },
      small: {
        allowNull: true,
        type: Sequelize.STRING
      },
      thumb: {
        allowNull: true,
        type: Sequelize.STRING
      },
      copyright: {
        allowNull: true,
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
    return queryInterface.dropTable('Images');
  }
};