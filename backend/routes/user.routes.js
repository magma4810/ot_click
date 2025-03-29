import Router from 'express';
import { userController } from '../controller/user.controller.js';

export const userRouter = new Router();

userRouter.get('/getVacancies', userController.getVacancies);
userRouter.get('/getUsers', userController.getUsers);
userRouter.get('/checkAuthUser', userController.checkAuthUser);
userRouter.post('/loginUser', userController.loginUser);
userRouter.post('/registerApplicant', userController.registerApplicant);
userRouter.post('/registerEmployer', userController.registerEmployer);
userRouter.post('/logoutUser', userController.logoutUser);
