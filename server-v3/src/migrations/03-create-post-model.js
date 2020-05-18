'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      title: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'Posts', // name of Target model
          key: 'title', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      subtitle: {
        allowNull: true,
        type: Sequelize.STRING
      },
      postType: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "GENERAL"
      },
      languages: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "KO"
      },
      authorId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      thumbnailId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      keywords: {
        allowNull: true,
        type: Sequelize.STRING
      },
      summary: {
        allowNull: true,
        type: Sequelize.STRING
      },
      numViews: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      numLikes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      numComments: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      isPrivate: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      publishedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deprecatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};