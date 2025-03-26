import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

export const Users = sequelize.define('Users', {
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
}, {
    timestamps: false 
  });


