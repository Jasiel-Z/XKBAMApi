'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarjetabancaria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titular: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaExpiracion: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('tarjetabancaria');
  }
};