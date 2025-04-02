module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('UsersEmployer', [
        {
          username: 'employer1',
          password: '$2a$10$X8z5',
          companyNameUser: 'TechCorp',
          vacanciesID: [1, 2, 11, 12, 21, 22, 29, 30]
        },
        {
          username: 'employer2',
          password: '$2a$10$Y9w6',
          companyNameUser: 'DataWorks',
          vacanciesID: [3, 4, 13, 14, 23, 24]
        },
        {
          username: 'employer3',
          password: '$2a$10$Z0x7',
          companyNameUser: 'DesignStudio',
          vacanciesID: [5, 6, 15, 16, 25, 26]
        },
        {
          username: 'employer4',
          password: '$2a$10$V8y9',
          companyNameUser: 'AppMakers',
          vacanciesID: [7, 8, 17, 18, 27, 28]
        },
        {
          username: 'employer5',
          password: '$2a$10$U7v6',
          companyNameUser: 'MarketGurus',
          vacanciesID: [9, 10, 19, 20, 31, 32]
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('UsersEmployer', null, {});
    }
  };