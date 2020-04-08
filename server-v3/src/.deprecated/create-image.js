'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Image', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      width: {
        allowNull: false,
        type: Sequelize.STRING
      },
      height: {
        allowNull: false,
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
      fileId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      copyright: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "UNKNOWN"
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
    return queryInterface.dropTable('Image');
  }
};