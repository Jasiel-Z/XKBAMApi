'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articulocompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidadarticulo: {
        type: Sequelize.INTEGER
      },
      preciounitario: {
        type: Sequelize.DOUBLE
      },
      preciofinal: {
        type: Sequelize.DOUBLE
      },
      idproducto: {
        type: Sequelize.STRING
      },
      idcompra: {
        type: Sequelize.INTEGER
      },
      idtalla: {
        type: Sequelize.INTEGER
      },
      idcolor: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articulocompras');
  }
};