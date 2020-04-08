'use strict';

module.exports = function (sequelize, DataTypes) {
  var Topic = sequelize.define('Topic', {
    name: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    subname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    languages: {
      allowNull: true,
      type: DataTypes.STRING
    },
    coverImageId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    coverDescription: {
      allowNull: true,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    backImageId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    iconId: {
      allowNull: true,
      type: DataTypes.UUID
    }
  }, {});

  Topic.associate = function (models) {
    Topic.belongsToMany(models.Post, {
      as: "posts",
      through: "PostsTopics",
      foreignKey: "topicName"
    });
    Topic.belongsTo(models.File, {
      as: "coverImage",
      foreignKey: "coverImageId"
    });
    Topic.belongsToMany(models.Event, {
      as: "events",
      through: "EventsTopics",
      foreignKey: "topicName"
    });
    Topic.belongsToMany(models.Series, {
      as: "series",
      through: "SeriesTopics",
      foreignKey: "topicName"
    });
    Topic.belongsTo(models.File, {
      as: "backImage",
      foreignKey: "backImageId"
    });
    Topic.belongsTo(models.File, {
      as: "icon",
      foreignKey: "iconId"
    });
  };

  return Topic;
};