'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulo extends Model {
    static associate(models) {
      articulo.belongsToMany(models.compra, {through: 'articulocompra', foreignKey: 'codigoArticulo'})
      articulo.belongsToMany(models.carrito, {through: 'articulocarrito', foreignKey: 'codigoArticulo'})
      articulo.hasMany(models.multimedia, {foreignKey: 'codigoArticulo'})
    }
  }
  articulo.init({
    codigoArticulo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
      
    }, 
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    idColor:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idCategoria:{
      type: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    freezeTableName:true,
    modelName: 'articulo',
  });
  return articulo;
};