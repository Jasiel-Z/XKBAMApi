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
    estado: DataTypes.STRING,
    municipio: DataTypes.STRING,
    codigopostal: DataTypes.STRING,
    calle: DataTypes.STRING,
    numeroexterno: DataTypes.INTEGER,
    idusuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'direccion',
  });
  return direccion;
};