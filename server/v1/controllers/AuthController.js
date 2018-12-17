import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../models/User';
import Response from '../helpers/Response';
import { EXPIRES_IN } from '../constants/jwtOptions';

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
    newUserData.isAdmin = false;
    newUserData.verified = false;

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
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: EXPIRES_IN });
    req.token = token;

    const data = payload;
    data.token = token;

    return Response.success(res, data);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async refreshToken(req, res) {
    const refreshedToken = req.headers['x-access-token'] || req.query.token;
    const { decoded } = req;

    const payload = {
      id: decoded.id,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      token: refreshedToken
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: EXPIRES_IN });

    const data = payload;
    data.token = token;

    // we will check to see that it exists in the object
    // bearing refresh tokens.
    // if it is found, then return response with a message
    // invalid token
    if (AuthController.refreshedTokens[refreshedToken]) {
      return Response.invalidToken(res);
    }
    // save the token as a refreshed token
    AuthController.refreshedTokens[refreshedToken] = {
      userId: payload.id,
      refreshedAt: new Date()
    };

    return Response.success(res, data);
  }

  /**
   * Clear the token refreshed tokens already expired
   * @returns {*} - no return
   */
  static clearRefreshedToken() {
    // initialize refreshed tokens for the AuthController
    if (AuthController.refreshedTokens === undefined) {
      AuthController.refreshedTokens = {};
    }
    // delete the refreshed tokens that have exceeded the expiry time
    // from the in memory object capturing refreshed token
    // the EXPIRES_IN constant is presented in seconds
    // convert it to milliseconds
    // the delay method accepts milliseconds
    const deleteInterval = EXPIRES_IN * 1000;

    setInterval(() => {
      let createdSeconds;
      let secondsDifference;
      const nowTime = new Date();
      const tokens = Object.keys(AuthController.refreshedTokens);

      tokens.forEach((token) => {
        createdSeconds = AuthController.refreshedTokens[token].refreshedAt.getSeconds();
        secondsDifference = nowTime.getSeconds() - createdSeconds;
        // token is expired
        if (secondsDifference >= EXPIRES_IN) {
          delete AuthController.refreshedTokens[token];
        }
      });
    }, deleteInterval);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async deleteUser(req, res) {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return Response.notFound(res);
    }
    const deleted = await User.delete(user.id);
    if (deleted) {
      return Response.noContent(res);
    }
  }
}

AuthController.clearRefreshedToken();
export default AuthController;
