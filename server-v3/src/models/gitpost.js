'use strict';
module.exports = (sequelize, DataTypes) => {
  const GitPost = sequelize.define('GitPost', {
    title: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    gitRepoName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    gitRepoUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gitAuthor: {
      allowNull: true,
      type: DataTypes.STRING
    },
    mainImageId: {
      allowNull: true,
      type: DataTypes.UUID
    }
  }, {});
  GitPost.associate = function (models) {
    GitPost.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "title"
    });
    GitPost.belongsTo(models.File, {
      as: "mainImage",
      foreignKey: "mainImageId"
    });
  };
  return GitPost;
};