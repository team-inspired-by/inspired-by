'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define('PostLike', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    linkedPostTitle: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {});
  PostLike.associate = function (models) {
    PostLike.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "linkedPostTitle"
    });
    PostLike.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
  };
  return PostLike;
};