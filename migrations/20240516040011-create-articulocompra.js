'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articulocompra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidadarticulo: {
        type: Sequelize.INTEGER,        
        allowNull: false
      },
      preciounitario: {
        type: Sequelize.DOUBLE,
        allowNull: false

      },
      preciofinal: {
        type: Sequelize.DOUBLE,
        allowNull: false

      },
      idarticulo: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'articulo',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      idcompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'compra',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      idtalla: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'talla',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      idcolor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'color',
          key: 'id',
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