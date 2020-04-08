'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      linkedPostTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contents: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authorId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      isReply: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      numLikes: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable('Comments');
  }
};