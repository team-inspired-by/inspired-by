'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookPostsFiles = sequelize.define('BookPostsFiles', {
    postTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'BookPosts',
        key: 'title'
      }
    },
    fileId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Files',
        key: 'id'
      }
    }
  }, {});
  BookPostsFiles.associate = function (models) {
    // associations can be defined here
  };
  return BookPostsFiles;
};