import  { sequelize } from '../database.js';

class UserController{
    async getVacancies(req,res){
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
}

export const userController = new UserController();