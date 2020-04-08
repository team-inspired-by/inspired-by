'use strict';
module.exports = (sequelize, DataTypes) => {
  const GeneralPostsImages = sequelize.define('GeneralPostsImages', {
    postTitle: DataTypes.STRING,
    fileId: DataTypes.UUID
  }, {});
  GeneralPostsImages.associate = function(models) {
    // associations can be defined here
  };
  return GeneralPostsImages;
};