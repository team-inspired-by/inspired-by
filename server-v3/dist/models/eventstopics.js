'use strict';

module.exports = function (sequelize, DataTypes) {
  var EventTopics = sequelize.define('EventsTopics', {
    eventId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    topicName: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Topics',
        key: 'name'
      }
    }
  }, {});

  EventTopics.associate = function (models) {// associations can be defined here
  };

  return EventTopics;
};