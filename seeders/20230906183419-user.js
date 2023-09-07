'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [
    {
      id: '1bf60286-dc08-4421-9ede-b41c21d1fcac',
      name: 'daniel',
      email: 'daniel@example.com',
      password: '12345678',
      phone_number: '9035340333',
      contact: 'lagos, state',
      gender: 'male',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '1bf60286-dc08-4421-9ede-b41c21d1fcd3',
      name: 'daniel',
      email: 'daniel12@example.com',
      password: '12345678',
      phone_number: '9035340333',
      contact: 'lagos, state',
      gender: 'male',
      created_at: new Date(),
      updated_at: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {
      email: 'daniel@example.com'
    })
  }
};
