'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GeneralPosts', {
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