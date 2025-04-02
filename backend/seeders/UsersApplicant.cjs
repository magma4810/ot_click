module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('UsersApplicant', [
          {
            username: 'applicant1',
            password: '$2a$10$A1b2',
            subscribeVacanciesID: [3, 7, 15, 22]
          },
          {
            username: 'applicant2',
            password: '$2a$10$B2c3',
            subscribeVacanciesID: [1, 5, 12, 18, 24]
          },
          {
            username: 'applicant3',
            password: '$2a$10$C3d4',
            subscribeVacanciesID: [8, 14, 21]
          },
          {
            username: 'applicant4',
            password: '$2a$10$D4e5',
            subscribeVacanciesID: [2, 6, 11, 16, 23, 30]
          },
          {
            username: 'applicant5',
            password: '$2a$10$E5f6',
            subscribeVacanciesID: [4, 9, 17, 25]
          },
          {
            username: 'applicant6',
            password: '$2a$10$F6g7',
            subscribeVacanciesID: [10, 13, 20, 27, 31]
          },
          {
            username: 'applicant7',
            password: '$2a$10$G7h8',
            subscribeVacanciesID: [19, 26, 29]
          },
          {
            username: 'applicant8',
            password: '$2a$10$H8i9',
            subscribeVacanciesID: [7, 15, 22, 28, 32]
          },
          {
            username: 'applicant9',
            password: '$2a$10$I9j0',
            subscribeVacanciesID: [3, 12, 18, 24]
          },
          {
            username: 'applicant10',
            password: '$2a$10$J0k1',
            subscribeVacanciesID: [5, 14, 21, 30]
          }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('UsersApplicant', null, {});
    }
  };