import Router from 'express';
import { userController } from '../controller/user.controller.js';

export const userRouter = new Router();

userRouter.get('/getVacancies', userController.getVacancies);
userRouter.get('/getUsers', userController.getUsers);
userRouter.post('/loginUser', userController.loginUser);
userRouter.post('/registerUser', userController.registerUser);
userRouter.post('/logoutUser', userController.logoutUser);