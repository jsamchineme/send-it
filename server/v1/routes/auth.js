import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/inputValidation/auth';

const authRoutes = Router();

authRoutes.post('/login', AuthValidator.validateLogin, AuthController.login);
authRoutes.post('/signup', AuthValidator.validateSignup, AuthController.signup);

export default authRoutes;
