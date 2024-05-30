'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articulocarrito', {
      idArticuloCarrito: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidadArticulo: {
        type: Sequelize.INTEGER,
        allowNull: false

      },
      precioUnitario: {
        type: Sequelize.DOUBLE,
        allowNull: false

      },
      precioFinal: {
        type: Sequelize.DOUBLE,
        allowNull: false

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
      idCarrito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carrito',
          key: 'idCarrito'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      idTalla: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'talla',
          key: 'idTalla'
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
    await queryInterface.dropTable('articulocarrito');
  }
};