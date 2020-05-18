'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    linkedPostTitle: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    authorId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    isReply: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    replyToCommentId: {
      allowNull: true,
      type: DataTypes.STRING
    },
    numLikes: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "linkedPostTitle"
    });
    Comment.belongsTo(models.User, {
      as: "author",
      foreignKey: "authorId"
    });
    Comment.belongsTo(models.Comment, {
      as: "replyToComment",
      foreignKey: "replyToCommentId"
    })
  };
  return Comment;
};