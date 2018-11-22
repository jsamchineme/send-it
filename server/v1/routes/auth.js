import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/inputValidation/auth';
import Authentication from '../middlewares/Authentication';
import Roles from '../middlewares/Roles';

const authRoutes = Router();

const { verifyToken } = Authentication;
const { validateLogin, validateSignup, validateUnique } = AuthValidator;
const { signup, deleteUser, login } = AuthController;
const { isAdmin } = Roles;

authRoutes.post('/login', validateLogin, login);
authRoutes.post('/signup', validateSignup, validateUnique, signup);
authRoutes.delete('/users/:userId', verifyToken, isAdmin, deleteUser);

export default authRoutes;
