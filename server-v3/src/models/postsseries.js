'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostsSeries = sequelize.define('PostsSeries', {
    postTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Posts',
        key: 'title'
      }
    },
    seriesTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Series',
        key: 'title'
      }
    },
  }, {});
  PostsSeries.associate = function (models) {
    // associations can be defined here
  };
  return PostsSeries;
};