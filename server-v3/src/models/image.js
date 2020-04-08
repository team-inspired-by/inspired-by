'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    size: {
      allowNull: true,
      type: DataTypes.STRING
    },
    width: {
      allowNull: true,
      type: DataTypes.STRING
    },
    height: {
      allowNull: true,
      type: DataTypes.STRING
    },
    color: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tags: {
      allowNull: true,
      type: DataTypes.STRING
    },
    raw: {
      allowNull: true,
      type: DataTypes.STRING
    },
    full: {
      allowNull: true,
      type: DataTypes.STRING
    },
    regular: {
      allowNull: true,
      type: DataTypes.STRING
    },
    small: {
      allowNull: true,
      type: DataTypes.STRING
    },
    thumb: {
      allowNull: true,
      type: DataTypes.STRING
    },
    copyright: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "UNKNOWN"
    },
  }, {});
  Image.associate = function (models) {};
  return Image;
};