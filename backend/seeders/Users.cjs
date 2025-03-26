module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
          username: 'employer1',
          password: '$2a$10$X8z5', 
          companyNameUser: 'TechCorp',
          role: 'employer',
          subscribeVacanciesID: null,
          vacanciesID: [1,5,13,24,6]
        },
        {
          username: 'employer2',
          password: '$2a$10$Y9z6', 
          companyNameUser: 'DataWorks',
          role: 'employer',
          subscribeVacanciesID: null,
          vacanciesID: [16,15,8,35,14]
        },
        {
          username: 'employer3',
          password: '$2a$10$Z0a7', 
          companyNameUser: 'MarketGurus',
          role: 'employer',
          subscribeVacanciesID: null,
          vacanciesID: [9,33,11,28,3]
        },
        {
          username: 'applicant1',
          password: '$2a$10$A1b2', 
          companyNameUser: null,
          role: 'applicant',
          subscribeVacanciesID: [2,6,17,2],
          vacanciesID: null
        },
        {
          username: 'applicant2',
          password: '$2a$10$B2c3', 
          companyNameUser: null,
          role: 'applicant',
          subscribeVacanciesID: [1,9,17,23],
          vacanciesID: null
        },
        {
          username: 'applicant3',
          password: '$2a$10$C3d4', 
          companyNameUser: null,
          role: 'applicant',
          subscribeVacanciesID: [17,23,8,11],
          vacanciesID: null
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    }
  };