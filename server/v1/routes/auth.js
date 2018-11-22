import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/inputValidation/auth';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';

const authRoutes = Router();

authRoutes.post('/login', AuthValidator.validateLogin, AuthController.login);
authRoutes.post('/signup', AuthValidator.validateSignup, AuthValidator.unique, AuthController.signup);
authRoutes.delete('/users/:userId', JWT.authenticate, Roles.isAdmin, AuthController.delete);

export default authRoutes;
