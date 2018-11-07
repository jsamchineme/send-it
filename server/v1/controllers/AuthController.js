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
  static signup(req, res) {
    const newUserData = req.body;
    const { password } = newUserData;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    newUserData.password = hashedPassword;
    const newUser = User.create(newUserData);

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
  static login(req, res) {
    const { email, password } = req.body;

    const user = User.findByAttribute('email', email);
    let foundCredentials = false;
    if (user) {
      foundCredentials = bcrypt.compareSync(password, user.password);
    }

    if (!foundCredentials) {
      return res.status(401).send({
        message: 'Unauthorised',
      });
    }

    return res.status(200).send({
      message: 'success',
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }
}

export default AuthController;
