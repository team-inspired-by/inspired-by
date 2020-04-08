'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookPost = sequelize.define('BookPost', {
    title: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    lastContentId: {
      allowNull: false,
      type: DataTypes.UUID
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
    }
  }, {
    timestamps: false
  });
  BookPost.associate = function (models) {
    BookPost.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "title"
    });
    BookPost.hasMany(models.Contribution, {
      as: "contributions",
      sourceKey: "title",
      foreignKey: "linkedPostTitle"
    });
    BookPost.belongsTo(models.Content, {
      as: "lastContent",
      foreignKey: "lastContentId"
    });
    BookPost.hasMany(models.Comment, {
      as: "comments",
      sourceKey: "title",
      foreignKey: "linkedPostTitle"
    });
    BookPost.belongsToMany(models.File, {
      as: "contentFiles",
      through: "BookPostsFiles",
      foreignKey: "postTitle",
    });
  };
  return BookPost;
};