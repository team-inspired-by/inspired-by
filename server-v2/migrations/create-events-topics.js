'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventsTopics', {
      EventId: {
        type: Sequelize.UUID
      },
      TopicName: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventsTopics');
  }
};