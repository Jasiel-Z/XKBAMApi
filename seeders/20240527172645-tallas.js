'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('talla', [
      { nombre: 'CH', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'M', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'G', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'XG', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'XCH', createdAt: new Date(), updatedAt: new Date() },


    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('talla', null, {})

  }
};
