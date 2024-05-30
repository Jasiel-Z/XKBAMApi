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
    idOpinion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigoArticulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'opinion',
  });
  return opinion;
};