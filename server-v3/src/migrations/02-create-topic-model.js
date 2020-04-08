'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Topics', {
      name: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      subname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      languages: {
        allowNull: true,
        type: Sequelize.STRING
      },
      coverImageId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      coverDescription: {
        allowNull: true,
        type: Sequelize.STRING
      },
      numViews: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      backImageId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      iconId: {
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
    return queryInterface.dropTable('Topics');
  }
};