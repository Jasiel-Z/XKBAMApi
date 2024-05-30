'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class direccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  direccion.init({
    idDireccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoPostal: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    calle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numeroExterno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'direccion',
  });
  return direccion;
};