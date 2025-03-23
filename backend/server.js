import { userRouter } from './routes/user.routes.js';
import express, { json } from 'express';
import { Vacancies } from "./models/Vacancies.js";
import path from 'path';
import cors from "cors";
import { sequelize } from './database.js';

const PORT = 3001;
const app = express();

app.use(json())

app.use(cors());

app.use('/api', userRouter);

const startServer = async () => {
  try {
    await sequelize.sync(); ; 
    console.log('База данных синхронизирована.');
    
    app.listen(PORT,'localhost', () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка синхронизации базы данных:', error);
  }
};

startServer();

export default app;