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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechacreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaentrega: {
     type: DataTypes.DATE,
     allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idcompra: {
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