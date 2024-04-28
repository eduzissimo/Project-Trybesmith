import express from 'express';
import loginController from '../controller/login.controller';
import validateLogin from '../middlewares/login.middleware';

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, loginController.login);

export default loginRouter;