'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarjetabancaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tarjetabancaria.init({
    titular: DataTypes.STRING,
    fechaExpiracion: DataTypes.DATE,
    idusuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tarjetabancaria',
  });
  return tarjetabancaria;
};