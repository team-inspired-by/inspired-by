'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeriesTopics = sequelize.define('SeriesTopics', {
    seriesTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Series',
        key: 'title'
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
  SeriesTopics.associate = function (models) {
    // associations can be defined here
  };
  return SeriesTopics;
};