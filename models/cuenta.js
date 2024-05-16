'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cuenta.init({
    contrasena: DataTypes.STRING,
    correo: DataTypes.STRING,
    rolid: DataTypes.INTEGER,
    usuarioid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cuenta',
  });
  return cuenta;
};