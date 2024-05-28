'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoria', [
      { nombre: 'Superiores', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Inferiores', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Accesorios', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Conjuntos', createdAt: new Date(), updatedAt: new Date() }

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categoria', null, {})

  }
};
