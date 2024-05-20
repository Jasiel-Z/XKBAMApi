'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechacompra: {
        type: Sequelize.DATE,
        allowNull: false
      },
      montofinal: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      idusuario: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'nombreusuario'
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