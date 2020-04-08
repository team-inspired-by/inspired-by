'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    size: {
      allowNull: false,
      type: DataTypes.STRING
    },
    width: {
      allowNull: false,
      type: DataTypes.STRING
    },
    height: {
      allowNull: false,
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
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "UNKNOWN"
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
  Image.associate = function (models) {};
  return Image;
};