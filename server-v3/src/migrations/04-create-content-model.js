'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contents', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      linkedPostTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      language: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "KO"
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isDraft: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Contents');
  }
};