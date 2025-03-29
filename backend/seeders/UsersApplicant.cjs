module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('UsersApplicant', [
        {
          username: 'applicant1',
          password: '$2a$10$A1b2', 
          subscribeVacanciesID: [2,6,17,2],
        },
        {
          username: 'applicant2',
          password: '$2a$10$B2c3', 
          subscribeVacanciesID: [1,9,17,23],
        },
        {
          username: 'applicant3',
          password: '$2a$10$C3d4', 
          subscribeVacanciesID: [17,23,8,11],
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('UsersApplicant', null, {});
    }
  };