import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStore from 'session-file-store';
import { userRouter } from './routes/user.routes.js';
import { sequelize } from './database.js';

const FileStore = fileStore(session);
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: new FileStore(),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true,
      secure: false 
    }
  })
);

app.use('/api', userRouter);
process.on('SIGTERM', async () => {
  await sequelize.close();
  server.close();
});
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('База данных синхронизирована.');
    
    app.listen(PORT, 'localhost', () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка синхронизации базы данных:', error);
  }
};

startServer();

export default app;