'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class multimedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  multimedia.init({
    nombre: DataTypes.STRING,
    idproducto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'multimedia',
  });
  return multimedia;
};