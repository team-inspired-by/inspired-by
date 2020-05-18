'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    subtitle: {
      allowNull: true,
      type: DataTypes.STRING
    },
    postType: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "GENERAL"
    },
    languages: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "KO"
    },
    authorId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    thumbnailId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    keywords: {
      allowNull: true,
      type: DataTypes.STRING
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numLikes: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numComments: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isPrivate: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publishedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deprecatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: "author",
      foreignKey: "authorId"
    });
    Post.belongsToMany(models.Series, {
      as: "series",
      through: "PostsSeries",
      foreignKey: "postTitle",
    });
    Post.belongsToMany(models.Topic, {
      as: "topics",
      through: "PostsTopics",
      foreignKey: "postTitle",
    });
    Post.belongsToMany(models.User, {
      as: "scrappedUsers",
      through: "PostsUsers",
      foreignKey: "postTitle",
    })
    Post.belongsTo(models.Image, {
      as: "thumbnail",
      foreignKey: "thumbnailId"
    });
    Post.hasOne(models.GeneralPost, {
      as: "generalPost",
      foreignKey: {
        name: "title",
        allowNull: false
      },
      onDelete: "cascade",
      hooks: true
    })
  };
  return Post;
};