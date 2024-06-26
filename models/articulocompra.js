'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulocompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      articulocompra.belongsTo(models.carrito, { foreignKey: 'idCarrito', targetKey: 'idCarrito' });
      articulocompra.belongsTo(models.compra, { foreignKey: 'idCompra', targetKey: 'idCompra' });
      articulocompra.belongsTo(models.articulo, { foreignKey: 'codigoArticulo', targetKey: 'codigoArticulo' });

    }
  }
  articulocompra.init({
    idArticuloCompra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cantidadArticulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },  
    precioFinal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codigoArticulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCompra: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'articulocompra',
  });
  return articulocompra;
};