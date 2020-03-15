'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "GENERAL"
    },
    ownerId: {
      allowNull: true,
      type: DataTypes.UUID,
      // references: {
      //   model: 'Users',
      //   key: 'id',
      // }
    },
    // contributions:
    contents: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    originalContents: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "no contents"
    },
    // series:
    // topics:
    // comments:
    keywords: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numLikes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numComments: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isPrivate: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // usedFiles:
    // thumbImages:
    // contentImages:
    publishedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deprecatedAt: {
      allowNull: true,
      type: DataTypes.DATE
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
  Post.associate = function (models) {
    // Post.hasOne(models.User, {
    //   as: "owner",
    //   // foreignKey: "id"
    // })
    Post.belongsTo(models.User, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      as: "owner",
    })
    Post.belongsTo(models.BookPost, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "bookInfo",
      foreignKey: "title"
    })
    Post.belongsTo(models.GitPost, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "gitInfo",
      foreignKey: "title"
    })
    Post.hasMany(models.Contribution, {
      sourceKey: "title",
      foreignKey: "postId",
      as: "contributions"
    })
    Post.belongsToMany(models.Series, {
      through: "SeriesPosts"
    })

  };
  return Post;
};