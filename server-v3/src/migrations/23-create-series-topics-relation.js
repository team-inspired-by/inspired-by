'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SeriesTopics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seriesTitle: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Series',
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
    return queryInterface.dropTable('SeriesTopics');
  }
};