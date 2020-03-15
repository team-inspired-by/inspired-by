'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "GENERAL"
      },
      ownerId: {
        allowNull: true,
        type: Sequelize.UUID,
        // references: {
        //   model: "Users",
        //   key: 'id',
        // }
      },
      // contributions:
      contents: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      originalContents: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "no contents"
      },
      // series:
      // topics:
      // comments:
      keywords: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      summary: {
        allowNull: true,
        type: Sequelize.STRING
      },
      numViews: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      numLikes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      numComments: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isPrivate: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      // usedFiles:
      // thumbImages:
      // contentImages:
      publishedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deprecatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};