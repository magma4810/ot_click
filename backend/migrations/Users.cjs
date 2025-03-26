'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Users', {
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
            companyNameUser: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM('employer', 'applicant'),
                allowNull: false
            },
            subscribeVacanciesID: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                defaultValue: null,
                allowNull: true
            },
            vacanciesID: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                defaultValue: null,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};