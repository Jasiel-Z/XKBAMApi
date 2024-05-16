'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class envio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  envio.init({
    fechacreacion: DataTypes.DATE,
    fechaentrega: DataTypes.DATE,
    estado: DataTypes.STRING,
    idcompra: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'envio',
  });
  return envio;
};