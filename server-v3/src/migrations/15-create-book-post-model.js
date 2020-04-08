'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BookPosts', {
      title: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      lastContentId: {
        allowNull: false,
        type: Sequelize.UUID
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
        type: Sequelize.STRING,
        defaultValue: "KYOBO"
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookPosts');
  }
};