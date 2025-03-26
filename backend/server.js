import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStore from 'session-file-store';
import { userRouter } from './routes/user.routes.js';
import { sequelize } from './database.js';

const FileStore = fileStore(session);
// const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
//   })
// );

app.use('/api', userRouter);
// process.on('SIGTERM', async () => {
//   await sequelize.close();
//   server.close();
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ошибка сервера' });
});
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('База данных подключена');
    await sequelize.sync(); // Синхронизация моделей с БД
    console.log('База данных синхронизирована');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
};

startServer();

export default app;