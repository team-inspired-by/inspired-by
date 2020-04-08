'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mainImageId: {
      allowNull: true,
      type: DataTypes.STRING
    },
    publishedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deprecatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  Event.associate = function (models) {
    Event.belongsTo(models.File, {
      as: "mainImage",
      foreignKey: "mainImageId"
    });
    Event.belongsToMany(models.Topic, {
      as: "topics",
      through: "EventsTopics",
      foreignKey: "eventId",
    });
  };
  return Event;
};