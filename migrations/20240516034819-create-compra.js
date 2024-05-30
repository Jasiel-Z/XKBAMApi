'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compra', {
      idCompra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaCompra: {
        type: Sequelize.DATE,
        allowNull: false
      },
      montoFinal: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
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
    await queryInterface.dropTable('compra');
  }
};