'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsTopics = sequelize.define('EventsTopics', {
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
  }, {
    timestamps: false
  });
  EventsTopics.associate = function (models) {};
  return EventsTopics;
};