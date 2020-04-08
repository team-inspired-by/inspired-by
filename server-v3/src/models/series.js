'use strict';
module.exports = (sequelize, DataTypes) => {
  const Series = sequelize.define('Series', {
    title: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numLikes: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Series.associate = function (models) {
    Series.belongsToMany(models.Post, {
      as: "posts",
      through: "PostsSeries",
      foreignKey: "seriesTitle",
    });
    Series.belongsToMany(models.Topic, {
      as: "topics",
      through: "SeriesTopics",
      foreignKey: "seriesTitle",
    });
  };
  return Series;
};