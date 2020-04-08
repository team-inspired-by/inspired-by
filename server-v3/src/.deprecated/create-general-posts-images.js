'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GeneralPostsImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postTitle: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'GeneralPosts',
          key: 'title'
        }
      },
      fileId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Images',
          key: 'id'
        }
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
    return queryInterface.dropTable('GeneralPostsImages');
  }
};