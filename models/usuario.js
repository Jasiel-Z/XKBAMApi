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
      usuario.hasMany(models.direccion, {foreignKey: 'idusuario'})
      usuario.hasMany(models.tarjetabancaria, {foreignKey: 'idusuario'})
      usuario.hasMany(models.compra, {foreignKey: 'idusuario'})
      usuario.hasMany(models.opinion, {foreignKey: 'idusuario'})
    }
    
  }
  usuario.init({
    nombreusuario: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidopaterno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidomaterno: {
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
