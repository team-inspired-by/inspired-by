'use strict';

module.exports = function (sequelize, DataTypes) {
  var GeneralPost = sequelize.define('GeneralPost', {
    title: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "GENERAL"
    },
    ownerId: {
      allowNull: true,
      type: DataTypes.UUID // references: {
      //   model: 'Users',
      //   key: 'id',
      // }

    },
    // contributions:
    contents: {
      allowNull: false,
      type: DataTypes.STRING
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
      type: DataTypes.STRING
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

  GeneralPost.associate = function (models) {
    // GeneralPost.hasOne(models.User, {
    //   as: "owner",
    //   // foreignKey: "id"
    // })
    GeneralPost.belongsTo(models.User, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      as: "owner"
    });
    GeneralPost.belongsTo(models.BookPost, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "bookInfo",
      foreignKey: "title"
    });
    GeneralPost.belongsTo(models.GitPost, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: "gitInfo",
      foreignKey: "title"
    });
    GeneralPost.hasMany(models.Contribution, {
      sourceKey: "title",
      foreignKey: "postId",
      as: "contributions"
    });
    GeneralPost.belongsToMany(models.Series, {
      through: "SeriesPosts"
    });
  };

  return GeneralPost;
};