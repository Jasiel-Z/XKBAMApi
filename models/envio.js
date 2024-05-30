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
    idEnvio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaEntrega: {
     type: DataTypes.DATE,
     allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCompra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'envio',
  });
  return envio;
};