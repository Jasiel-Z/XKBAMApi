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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cantidadarticulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preciounitario: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },  
    preciofinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    idarticulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idcompra: {
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
    modelName: 'articulocompra',
  });
  return articulocompra;
};