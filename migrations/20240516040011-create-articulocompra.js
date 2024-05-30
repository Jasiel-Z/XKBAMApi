'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articulocompra', {
      idArticuloCompra: {
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
      idCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'compra',
          key: 'idCompra'
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
    await queryInterface.dropTable('articulocompra');
  }
};