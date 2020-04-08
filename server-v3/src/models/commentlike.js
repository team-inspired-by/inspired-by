'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    linkedCommentId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {});
  CommentLike.associate = function (models) {
    CommentLike.belongsTo(models.Comment, {
      as: "linkedComment",
      foreignKey: "linkedCommentTitle"
    });
    CommentLike.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
  };
  return CommentLike;
};