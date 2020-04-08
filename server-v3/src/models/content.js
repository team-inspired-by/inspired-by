'use strict';
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    linkedPostTitle: {
      allowNull: false,
      type: DataTypes.STRING
    },
    language: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "KO"
    },
    contents: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isDraft: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Content.associate = function (models) {
    Content.belongsTo(models.Post, {
      as: "linkedPost",
      foreignKey: "linkedPostTitle"
    })
  };
  return Content;
};