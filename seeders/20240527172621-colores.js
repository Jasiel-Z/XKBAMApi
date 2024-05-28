'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('color', [
      { nombre: 'Negro', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Blanco', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Verde', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Rojo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Azul', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Gris', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Amarillo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Multicolor', createdAt: new Date(), updatedAt: new Date() }

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('color', null, {})

  }
};
