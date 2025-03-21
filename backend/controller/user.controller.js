import  { sequelize } from '../database.js';

class UserController{
    async createNewUser(req, res) {
        const { username, login, password } = req.body;
      
        // Начинаем транзакцию
        const transaction = await sequelize.transaction();
      
        try {
          // Первый запрос: добавление пользователя
          await sequelize.query(
            'INSERT INTO "Users" (nickname, login, password) VALUES (:username, :login, :password)',
            {
              replacements: { username, login, password },
              transaction, // Передаем транзакцию
            }
          );
      
          // Второй запрос: добавление статистики
          await sequelize.query(
            'INSERT INTO "Stats" (nickname) VALUES (:username)',
            {
              replacements: { username },
              transaction, // Передаем транзакцию
            }
          );
      
          // Фиксируем транзакцию
          await transaction.commit();
      
          res.json({ message: 'Пользователь успешно создан' });
        } catch (error) {
          // Откатываем транзакцию в случае ошибки
          await transaction.rollback();
      
          console.error('Ошибка при добавлении нового пользователя:', error);
          res.status(500).json({ error: 'Ошибка при добавлении нового пользователя' });
        }
      }
}

export const userController = new UserController();