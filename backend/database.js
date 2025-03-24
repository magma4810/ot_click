import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize("postgresql://postgres.irihbqadbzllthvseden:prFN4yhl1p8c7LLX@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Не удалось установить соединение с базой данных:', error);
  }
};

connectToDatabase();