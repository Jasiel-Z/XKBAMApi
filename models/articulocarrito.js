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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cantidadarticulo:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preciounitario:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    preciofinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    idproducto: {
      type:DataTypes.STRING,
    },
    idcarrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idtalla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idcolor: {
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