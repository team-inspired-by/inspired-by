'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GitPosts', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      gitId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gitAuthor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gitTitle: {
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
    return queryInterface.dropTable('GitPosts');
  }
};