'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuenta', {
      idCuenta: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idRol: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rol',
          key: 'idRol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      usuario: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'usuario',
          key: 'usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('cuenta');
  }
};