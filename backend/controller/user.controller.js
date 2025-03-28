import { sequelize } from '../database.js';

class UserController {
    async getVacancies(req, res) {
        try {
            const [getData, metadata] = await sequelize.query(
                `select * from "Vacancies"`,
                {
                    replacements: {}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении вакансий', error);
            res.status(500).json({ error: 'Ошибка при получении вакансий' });
        }
    }
    async getUsers(req, res) {
        try {
            const [getData, metadata] = await sequelize.query(
                `select * from "Users"`,
                {
                    replacements: {}
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении пользователей', error);
            res.status(500).json({ error: 'Ошибка при получении пользователей' });
        }
    }
    async loginUser(req, res) {
        res.cookie('authenticated', "true", { maxAge: 86400000, httpOnly: false });
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Ошибка при создании сессии' });
            }
            req.session.isAuthenticated = true;
            req.session.user = {
                username: req.username,
                role: req.role
            };
            res.json({
                success: true,
                message: 'Успешно!',
                user: req.session.user,
            });
        });
    }
    async logoutUser(req, res) {
        try {
            console.log('Cookies before clear:', req.cookies);
            
            // Очищаем куки
            res.clearCookie('authenticated', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });
            
            // Уничтожаем сессию
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Ошибка при выходе' 
                    });
                }
                
                // Очищаем сессионную куку после уничтожения сессии
                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                });
                
                console.log('Cookies after clear:', req.cookies);
                
                // Отправляем один ответ
                res.json({ 
                    success: true, 
                    message: 'Успешный выход',
                    clearClientCookies: true
                });
            });
            
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Внутренняя ошибка сервера' 
            });
        }
    }
    async registerUser(req, res) {
        const { username, password, companyNameUser, role } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                'INSERT INTO "Users" (username, password, "companyNameUser",role) VALUES (:username, :password,:companyNameUser,:role)',
                {
                    replacements: { username, password, companyNameUser, role }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при создании пользователя', error);
            res.status(500).json({ error: 'Ошибка при создании пользователя' });
        }
    }
    async checkAuthUser(req, res) {
        if (req.session.user) {
            res.json({ isAuthenticated: true, user: req.session.user });
          } else {
            res.json({ isAuthenticated: false });
          }
    }
    
}

export const userController = new UserController();