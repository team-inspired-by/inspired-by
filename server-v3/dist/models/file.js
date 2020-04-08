'use strict';

module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define('File', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    uploaderId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    alias: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fileType: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "ETC"
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  File.associate = function (models) {
    File.belongsTo(models.User, {
      as: "uploader",
      foreignKey: "uploaderId"
    });
    File.belongsTo(models.Image, {
      as: "imageInfo",
      foreignKey: "id"
    });
    File.belongsToMany(models.BookPost, {
      as: "linkedBookPosts",
      through: "BookPostsFiles",
      foreignKey: "fileId"
    });
    File.belongsToMany(models.GeneralPost, {
      as: "linkedGeneralPosts",
      through: "GeneralPostsFiles",
      foreignKey: "fileId"
    });
  };

  return File;
};