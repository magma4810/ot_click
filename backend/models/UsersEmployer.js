import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

export const UsersEmployer = sequelize.define('UsersEmployer', {
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
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "employer",
    allowNull: false
  },
  vacanciesID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
    allowNull: false
  },
}, {
    timestamps: false 
  });


