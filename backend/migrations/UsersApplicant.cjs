'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('UsersApplicant', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
              username: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              role: {
                type: DataTypes.STRING,
                defaultValue: "applicant",
                allowNull: false
              },
              subscribeVacanciesID: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                defaultValue: [],
                allowNull: false
              }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('UsersApplicant');
    },
};