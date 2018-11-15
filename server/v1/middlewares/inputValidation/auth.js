import joi from 'joi';
import { signupSchema, loginSchema } from '../../requestSchemas/auth';
import ResponseSchema from '../../utils/Response';

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
}

export default AuthValidator;
