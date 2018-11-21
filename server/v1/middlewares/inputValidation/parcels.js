import joi from 'joi';
import {
  parcelCreateSchema,
  changeDestinationSchema,
  changeStatusSchema,
  changePresentLocationSchema,
} from '../../requestSchemas/parcel';
import ResponseSchema from '../../helpers/Response';

/**
 * @export
 * @class ParcelValidator
 */
class ParcelValidator {
  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateCreate(req, res, next) {
    joi.validate(req.body, parcelCreateSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }

  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateChangeDestination(req, res, next) {
    joi.validate(req.body, changeDestinationSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }

  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateChangeStatus(req, res, next) {
    joi.validate(req.body, changeStatusSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }

  /**
   * @param {Object} req - received request
   * @param {Object} res - response object
   * @param {Object} next - next middleware
   * @return {Object} - response
   */
  static validateChangePresentLocation(req, res, next) {
    joi.validate(req.body, changePresentLocationSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }
}

export default ParcelValidator;
