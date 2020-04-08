'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GeneralPosts', {
      title: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      lastContentId: {
        allowNull: false,
        type: Sequelize.UUID
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GeneralPosts');
  }
};