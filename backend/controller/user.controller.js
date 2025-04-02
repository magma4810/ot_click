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
    async getUserInfoByName(req, res) {
        const { username } = req.params;
        try {
            const [getData] = await sequelize.query(
                `SELECT password, role FROM "UsersApplicant" WHERE username = :username
                 UNION ALL
                 SELECT password, role FROM "UsersEmployer" WHERE username = :username`,
                {
                    replacements: { username }
                }
            );

            if (getData.length === 0) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            res.json(getData[0]); // Возвращаем первого найденного пользователя
        } catch (error) {
            console.error('Ошибка при получении информации пользователя', error);
            res.status(500).json({ error: 'Ошибка при получении информации пользователя' });
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
                role: req.role,
            };
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Ошибка при сохранении сессии' });
                }
                res.json({
                    success: true,
                    message: 'Успешно!',
                    user: req.session.user,
                });
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
    async registerApplicant(req, res) {
        const { username, password } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                'INSERT INTO "UsersApplicant" (username, password) VALUES (:username, :password)',
                {
                    replacements: { username, password }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при создании соискателя', error);
            res.status(500).json({ error: 'Ошибка при создании соискателя' });
        }
    }
    async registerEmployer(req, res) {
        const { username, password, companyNameUser } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                'INSERT INTO "UsersEmployer" (username, password,"companyNameUser") VALUES (:username, :password,:companyNameUser)',
                {
                    replacements: { username, password, companyNameUser }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при создании работодателя', error);
            res.status(500).json({ error: 'Ошибка при создании работодателя' });
        }
    }
    async checkAuthUser(req, res) {
        if (req.session.user) {
            res.json({ isAuthenticated: true, user: req.session.user });
        } else {
            res.json({ isAuthenticated: false });
        }
    }
    async getInfoApplicant(req, res) {
        const { username } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                'SELECT * FROM "UsersApplicant" WHERE username = :username',
                {
                    replacements: { username }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении данных соискателя', error);
            res.status(500).json({ error: 'Ошибка при получении данных соискателя' });
        }
    }
    async getInfoEmployer(req, res) {
        const { username } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                'SELECT * FROM "UsersEmployer" WHERE username = :username',
                {
                    replacements: { username }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении данных работадателя', error);
            res.status(500).json({ error: 'Ошибка при получении данных работадателя' });
        }
    }
    async getSubscribe(req, res) {
        const { id } = req.params;
        try {
            const [getData, metadata] = await sequelize.query(
                'SELECT subscribe FROM "Vacancies" WHERE id = :id',
                {
                    replacements: { id }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении данных кол ва отликнувшихся', error);
            res.status(500).json({ error: 'Ошибка при получении данных кол ва отликнувшихся' });
        }
    }
    async updateSubscribe(req, res) {
        const { id } = req.params;
        const { subscribe } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                `UPDATE "Vacancies" 
         SET "subscribe" = :subscribe
         WHERE id = :id`,
                {
                    replacements: { id, subscribe }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при обновлении данных кол ва отликнувшихся', error);
            res.status(500).json({ error: 'Ошибка при обновлении данных кол ва отликнувшихся' });
        }
    }
    async changeVacancyIsActive(req, res) {
        const { id } = req.params;
        const { active } = req.body;
        try {
            const [getData, metadata] = await sequelize.query(
                `UPDATE "Vacancies" 
         SET "is_active" = :active
         WHERE id = :id`,
                {
                    replacements: { id,active }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при обновлении данных актуальности вакансии', error);
            res.status(500).json({ error: 'Ошибка при обновлении данных актуальности вакансии' });
        }
    }
    async updatePublishedVacanciesID(req, res) {
        try {
            const { username } = req.params;
            const { publishedVacanciesID } = req.body;

            const [getData, metadata] = await sequelize.query(
                `UPDATE "UsersEmployer" 
         SET "vacanciesID" = ARRAY[:publishedVacanciesID]
         WHERE username = :username`,
                {
                    replacements: {
                        publishedVacanciesID,
                        username
                    }
                }
            );
            res.json(getData);
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ error: 'Update failed' });
        }
    }
    async updateSubscribeVacanciesID(req, res) {
        try {
            const { username } = req.params;
            const { subscribeVacanciesID } = req.body;

            await sequelize.query(
                `UPDATE "UsersApplicant" 
         SET "subscribeVacanciesID" = ARRAY[:subscriptions]::integer[]
         WHERE username = :username`,
                {
                    replacements: {
                        subscriptions: subscribeVacanciesID,
                        username
                    }
                }
            );

            res.json({
                success: true,
                updatedSubscriptions: subscribeVacanciesID
            });

        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ error: 'Update failed' });
        }
    }
    async createVacancy(req, res) {
        const { title, description, companyName, location, salary, englishLvl, grade, tags, experience, skills, employmentType, category_id } = req.body;
        try {
            const result = await sequelize.query(
                'INSERT INTO "Vacancies" (title, description, "companyName",location,salary,"englishLvl",grade,tags,experience,skills,"employmentType",category_id) VALUES (:title, :description,:companyName,:location, :salary,:englishLvl,:grade,:tags,:experience,:skills,:employmentType,:category_id) RETURNING *',
                {
                    replacements: { title, description, companyName, location, salary, englishLvl, grade, tags, experience, skills, employmentType, category_id }
                }
            );
            res.json(result[0]);
        } catch (error) {
            console.error('Ошибка при создании вакансии', error);
            res.status(500).json({ error: 'Ошибка при создании вакансии' });
        }
    }
}

export const userController = new UserController();