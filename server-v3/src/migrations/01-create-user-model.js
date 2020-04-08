'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subscribeEmail: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      alias: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isStashed: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      stasherId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      stashedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      profileImageId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      profileMessage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      initialLetter: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isHeavyUser: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      level: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "VISITOR"
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
    return queryInterface.dropTable('Users');
  }
};