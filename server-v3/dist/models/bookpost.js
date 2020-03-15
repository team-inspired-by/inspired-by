'use strict';

module.exports = function (sequelize, DataTypes) {
  var BookPost = sequelize.define('BookPost', {
    title: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    bookName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bookPublisher: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bookPrice: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bookDescription: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bookUrl: {
      allowNull: true,
      type: DataTypes.STRING
    },
    linkedStore: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "KYOBO"
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

  BookPost.associate = function (models) {
    BookPost.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "post",
      foreignKey: "title"
    });
  };

  return BookPost;
};