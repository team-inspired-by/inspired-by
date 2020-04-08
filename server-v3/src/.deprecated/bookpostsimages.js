'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookPostsImages = sequelize.define('BookPostsImages', {
    postTitle: DataTypes.STRING,
    fileId: DataTypes.UUID
  }, {});
  BookPostsImages.associate = function(models) {
    // associations can be defined here
  };
  return BookPostsImages;
};