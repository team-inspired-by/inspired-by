'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contributions', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      linkedPostTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contributorName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contributorId: {
        allowNull: true,
        type: Sequelize.UUID
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
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
    return queryInterface.dropTable('Contributions');
  }
};