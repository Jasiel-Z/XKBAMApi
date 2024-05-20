'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('rol', [
      { nombre: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Usuario', createdAt: new Date(), updatedAt: new Date() }
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {})

  }
};
