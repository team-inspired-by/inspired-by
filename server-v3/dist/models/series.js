'use strict';

module.exports = function (sequelize, DataTypes) {
  var Series = sequelize.define('Series', {
    title: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    numViews: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    numLikes: {
      allowNull: false,
      type: DataTypes.INTEGER
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

  Series.associate = function (models) {
    Series.belongsToMany(models.Post, {
      through: "SeriesPosts"
    });
  };

  return Series;
};