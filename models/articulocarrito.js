'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulocarrito extends Model {
    

    static associate(models) {
      // define association here
    }
  }
  articulocarrito.init({
    idArticuloCarrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cantidadArticulo:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    precioFinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codigoArticulo: {
      type:DataTypes.STRING,
      allowNull: false

    },
    idCarrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'articulocarrito',
  });
  return articulocarrito;
};