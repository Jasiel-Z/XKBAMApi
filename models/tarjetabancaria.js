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
    numeroTarjeta: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    titular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaExpiracion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'tarjetabancaria',
  });
  return tarjetabancaria;
};