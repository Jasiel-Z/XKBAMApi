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
      usuario.hasMany(models.direccion, {foreignKey: 'usuario'})
      usuario.hasMany(models.tarjetabancaria, {foreignKey: 'usuario'})
      usuario.hasMany(models.compra, {foreignKey: 'usuario'})
      usuario.hasMany(models.opinion, {foreignKey: 'usuario'})
    }
    
  }
  usuario.init({
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'usuario',
  });
  return usuario;
};
