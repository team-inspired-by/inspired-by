'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefreshTokens', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userAlias: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expiredIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      issuedAccessToken: {
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
    return queryInterface.dropTable('RefreshTokens');
  }
};