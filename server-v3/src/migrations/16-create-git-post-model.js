'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GitPosts', {
      title: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      gitRepoName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gitRepoUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gitAuthor: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mainImageId: {
        allowNull: true,
        type: Sequelize.UUID
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