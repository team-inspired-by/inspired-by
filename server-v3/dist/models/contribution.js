'use strict';

module.exports = function (sequelize, DataTypes) {
  var Contribution = sequelize.define('Contribution', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    contributorName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
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

  Contribution.associate = function (models) {
    Contribution.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      as: "post",
      foreignKey: "postId"
    });
  };

  return Contribution;
};