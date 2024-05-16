'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulocompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  articulocompra.init({
    cantidadarticulo: DataTypes.INTEGER,
    preciounitario: DataTypes.DOUBLE,
    preciofinal: DataTypes.DOUBLE,
    idproducto: DataTypes.STRING,
    idcompra: DataTypes.INTEGER,
    idtalla: DataTypes.INTEGER,
    idcolor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'articulocompra',
  });
  return articulocompra;
};