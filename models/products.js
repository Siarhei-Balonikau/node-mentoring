'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.INT
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};