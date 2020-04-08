'use strict';

module.exports = function (sequelize, DataTypes) {
  var GeneralPost = sequelize.define('GeneralPost', {
    title: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    lastContentId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {
    timestamps: false
  });

  GeneralPost.associate = function (models) {
    GeneralPost.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "title"
    });
    GeneralPost.hasMany(models.Contribution, {
      as: "contributions",
      sourceKey: "title",
      foreignKey: "linkedPostTitle"
    });
    GeneralPost.belongsTo(models.Content, {
      as: "lastContent",
      foreignKey: "lastContentId"
    });
    GeneralPost.hasMany(models.Comment, {
      as: "comments",
      sourceKey: "title",
      foreignKey: "linkedPostTitle"
    });
    GeneralPost.belongsToMany(models.File, {
      as: "contentFiles",
      through: "GeneralPostsFiles",
      foreignKey: "postTitle"
    });
  };

  return GeneralPost;
};