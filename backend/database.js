import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

export const sequelize = new Sequelize(
  "postgresql://postgres.irihbqadbzllthvseden:prFN4yhl1p8c7LLX@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
  {
    dialect: 'postgres',
    dialectModule: pg,
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

