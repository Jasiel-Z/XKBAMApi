'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulo extends Model {
    static associate(models) {
      articulo.belongsToMany(models.compra, {through: 'articulocompra', foreignKey: 'idarticulo'})
      articulo.belongsToMany(models.carrito, {through: 'articulocarrito', foreignKey: 'idarticulo'})
      articulo.hasMany(models.multimedia, {foreignKey: 'idarticulo'})
    }
  }
  articulo.init({
    id: {
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
    idcategoria:{
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