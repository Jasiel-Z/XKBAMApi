'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opinion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  opinion.init({
    idproducto: DataTypes.STRING,
    comentario: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    idusuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'opinion',
  });
  return opinion;
};