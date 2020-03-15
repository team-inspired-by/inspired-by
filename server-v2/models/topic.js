'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
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
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  Topic.associate = function (models) {
    Topic.belongsToMany(models.Event, {
      through: "EventsTopics"
    })
  };
  return Topic;
};