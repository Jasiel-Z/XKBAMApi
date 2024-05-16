'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    nombre: DataTypes.STRING,
    apellidopaterno: DataTypes.STRING,
    apellidomaterno: DataTypes.STRING,
    genero: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};