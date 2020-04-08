'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsTopics', {
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
          model: 'Posts',
          key: 'title'
        }
      },
      topicName: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Topics',
          key: 'name'
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
    return queryInterface.dropTable('PostsTopics');
  }
};