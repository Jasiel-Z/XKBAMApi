'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opinion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      articuloid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'articulo',
          key: 'id'
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
      usuarioid: {
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
    await queryInterface.dropTable('opinion');
  }
};