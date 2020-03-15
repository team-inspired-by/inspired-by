'use strict';
module.exports = (sequelize, DataTypes) => {
  const GitPost = sequelize.define('GitPost', {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    gitId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gitAuthor: {
      allowNull: false,
      type: DataTypes.STRING
    },
    gitTitle: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  GitPost.associate = function (models) {
    GitPost.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "post",
      foreignKey: "title"
    })
  };
  return GitPost;
};