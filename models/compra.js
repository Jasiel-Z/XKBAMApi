'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      compra.hasMany(models.articulocompra, { foreignKey: 'idCompra', as: 'articulos' });

    }
  }
  compra.init({
    idCompra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCompra: {
      type: DataTypes.DATE,
      allowNull: false
    },
    montoFinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'compra',
  });
  return compra;
};