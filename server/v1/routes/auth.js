import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthValidator from '../middlewares/inputValidation/auth';
import Authentication from '../middlewares/Authentication';
import Roles from '../middlewares/Roles';
import passport from '../helpers/services/Passport';


const authRoutes = Router();

const { verifyToken } = Authentication;
const { validateLogin, validateSignup, validateUnique } = AuthValidator;
const {
  signup, deleteUser, login, socialLogin, refreshToken, requestPasswordReset, resetPassword
} = AuthController;
const { isAdmin } = Roles;

authRoutes.use(passport.initialize());

authRoutes.post('/login', validateLogin, login);
authRoutes.post('/signup', validateSignup, validateUnique, signup);
authRoutes.delete('/users/:userId', verifyToken, isAdmin, deleteUser);
authRoutes.patch('/refresh', verifyToken, refreshToken);
authRoutes.post('/reset', requestPasswordReset);
authRoutes.put('/reset', verifyToken, resetPassword);

authRoutes.get('/facebook', passport.authenticate('facebook'));
authRoutes.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }), socialLogin);


export default authRoutes;
