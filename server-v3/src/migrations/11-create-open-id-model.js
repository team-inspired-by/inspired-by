'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OpenIds', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      idType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      openId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accessToken: {
        allowNull: true,
        type: Sequelize.STRING
      },
      linkedUserId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      memo: {
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
    return queryInterface.dropTable('OpenIds');
  }
};