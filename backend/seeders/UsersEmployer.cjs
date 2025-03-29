module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('UsersEmployer', [
        {
          username: 'employer1',
          password: '$2a$10$X8z5', 
          companyNameUser: 'TechCorp',
          vacanciesID: [1,5,13,24,6]
        },
        {
          username: 'employer2',
          password: '$2a$10$Y9z6', 
          companyNameUser: 'DataWorks',
          vacanciesID: [16,15,8,35,14]
        },
        {
          username: 'employer3',
          password: '$2a$10$Z0a7', 
          companyNameUser: 'MarketGurus',
          vacanciesID: [9,33,11,28,3]
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('UsersEmployer', null, {});
    }
  };