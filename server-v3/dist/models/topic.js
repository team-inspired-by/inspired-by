'use strict';

module.exports = function (sequelize, DataTypes) {
  var Topic = sequelize.define('Topic', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    coverDescription: {
      allowNull: true,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  Topic.associate = function (models) {
    Topic.belongsToMany(models.Event, {
      through: "EventsTopics"
    });
  };

  return Topic;
};