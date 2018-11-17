import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../models/User';
import Response from '../utils/Response';

const User = new UserModel();

/**
 * @export
 * @class ParcelController
 */
class AuthController {
  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async signup(req, res) {
    const newUserData = req.body;
    const { password } = newUserData;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    newUserData.password = hashedPassword;
    newUserData.userType = 'client';

    const newUser = await User.create(newUserData);

    return Response.success(res, newUser);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findByAttribute('email', email);
    let foundCredentials = false;

    if (!user) {
      return Response.wrongCredentials(res);
    }

    foundCredentials = bcrypt.compareSync(password, user.password);

    if (!foundCredentials) {
      return Response.wrongCredentials(res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };
    // generate token and make it valid for 1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 1 });
    req.token = token;


    const data = payload;
    data.token = token;

    return Response.success(res, data);
  }
}

export default AuthController;
