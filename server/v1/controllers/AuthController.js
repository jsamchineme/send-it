import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../models/User';

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
    const newUser = await User.create(newUserData);

    return res.status(200).json({
      message: 'success',
      data: newUser,
    });
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
    if (user) {
      foundCredentials = bcrypt.compareSync(password, user.password);
    }

    if (!foundCredentials) {
      return res.status(401).send({
        status: 'Unauthorised',
        message: 'Provide valid credentials',
      });
    }

    const payload = {
      email: user.email,
      userId: user.id,
    };
    // generate token and make it valid for 1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 1 });
    req.token = token;

    return res.status(200).send({
      message: 'success',
      data: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  }
}

export default AuthController;
