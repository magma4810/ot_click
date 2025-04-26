import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

export const UsersApplicant = sequelize.define('UsersApplicant', {
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
  },
}, {
    timestamps: false 
  });


