'use strict';

module.exports = function (sequelize, DataTypes) {
  var SeriesPosts = sequelize.define('SeriesPosts', {
    SeriesId: {
      type: DataTypes.STRING,
      references: {
        type: "Series",
        key: "title"
      }
    },
    PostId: {
      type: DataTypes.STRING,
      references: {
        type: "Post",
        key: "title"
      }
    }
  }, {
    timestamps: false
  });

  SeriesPosts.associate = function (models) {};

  return SeriesPosts;
};