'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BookPosts', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      bookName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookPublisher: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookPrice: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bookDescription: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bookUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      linkedStore: {
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
    return queryInterface.dropTable('BookPosts');
  }
};