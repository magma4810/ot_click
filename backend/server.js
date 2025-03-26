import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStore from 'session-file-store';
import { userRouter } from './routes/user.routes.js';
import { sequelize } from './database.js';

const FileStore = fileStore(session);
const PORT = 3001;
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], 
  credentials: true
}));
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

app.get('/api/check-auth', (req, res) => {
  if (req.cookies.authenticated === 'true') { 
    return res.status(200).end();
  }
  res.status(401).end();
});
app.use('/api', userRouter);

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