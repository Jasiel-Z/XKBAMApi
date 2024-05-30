'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opinion', {
      idOpinion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigoArticulo: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'articulo',
          key: 'codigoArticulo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false

      },
      calificacion: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('opinion');
  }
};