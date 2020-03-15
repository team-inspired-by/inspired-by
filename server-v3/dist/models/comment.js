'use strict';

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    contents: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isReply: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    numLikes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
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

  Comment.associate = function (models) {// associations can be defined here
  };

  return Comment;
};