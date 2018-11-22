import joi from 'joi';
import { signupSchema, loginSchema } from '../../requestSchemas/auth';
import ResponseSchema from '../../helpers/Response';
import UserModel from '../../../models/User';

const User = new UserModel();

/**
 * @export
 * @class AuthValidator
 */
class AuthValidator {
  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateLogin(req, res, next) {
    joi.validate(req.body, loginSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }

  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateSignup(req, res, next) {
    joi.validate(req.body, signupSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }

  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static async unique(req, res, next) {
    const foundEmail = await User.where({ email: req.body.email }).getOne();
    const foundUsername = await User.where({ username: req.body.username }).getOne();

    if (foundEmail) {
      const err = {
        details: [
          { message: '"email" already exists' },
        ],
      };
      return ResponseSchema.unprocessable(res, err);
    }
    if (foundUsername) {
      const err = {
        details: [
          { message: '"username" already exists' },
        ],
      };
      return ResponseSchema.unprocessable(res, err);
    }
    next();
  }
}

export default AuthValidator;
