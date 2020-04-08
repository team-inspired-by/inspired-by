'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    subscribeEmail: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    alias: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isStashed: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    stasherId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    stashedDate: {
      allowNull: true,
      type: DataTypes.DATE
    },
    profileImageId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    profileMessage: {
      allowNull: true,
      type: DataTypes.STRING
    },
    initialLetter: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isHeavyUser: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    level: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "VISITOR"
    }
  }, {});

  User.associate = function (models) {
    User.belongsTo(models.User, {
      as: "stasher",
      foreignKey: "stasherId"
    });
    User.belongsTo(models.File, {
      as: "profileImage",
      foreignKey: "profileImageId"
    });
    User.hasMany(models.Post, {
      as: "writtenPosts",
      sourceKey: "id",
      foreignKey: "authorId"
    });
    User.belongsToMany(models.Post, {
      as: "scrappedPosts",
      through: "PostsUsers",
      foreignKey: "userId"
    });
    User.hasMany(models.Comment, {
      as: "writtenComments",
      sourceKey: "id",
      foreignKey: "authorId"
    });
    User.hasMany(models.Contribution, {
      as: "contributions",
      sourceKey: "id",
      foreignKey: "contributorId"
    });
  };

  return User;
};