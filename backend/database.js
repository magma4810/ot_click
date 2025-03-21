import Sequelize from 'sequelize';

export const sequelize = new Sequelize('ot_click_database', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres', 
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
