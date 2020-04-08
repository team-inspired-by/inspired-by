'use strict';
module.exports = (sequelize, DataTypes) => {
  const GeneralPostsFiles = sequelize.define('GeneralPostsFiles', {
    postTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'GeneralPosts',
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
    },
  }, {});
  GeneralPostsFiles.associate = function (models) {
    // associations can be defined here
  };
  return GeneralPostsFiles;
};