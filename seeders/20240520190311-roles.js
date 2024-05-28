'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('rol', [
      { nombre: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cliente', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {}),
    await queryInterface.bulkDelete('cuenta', null, {})


  }
};
