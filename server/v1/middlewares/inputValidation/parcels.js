import joi from 'joi';
import {
  parcelCreateSchema,
  changeDestinationSchema,
  changeStatusSchema,
  changeLocationSchema,
} from '../../requestSchemas/parcel';
import ResponseSchema from '../../helpers/Response';
import ParcelModel from '../../../models/Parcel';

const Parcel = new ParcelModel();

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
  static async validateStatus(req, res, next) {
    const parcel = await Parcel.where({ status: 'delivered', id: req.params.parcelId }).getOne();
    if (parcel) {
      const err = {
        details: [
          { message: 'status is already set as delivered' },
        ],
      };
      return ResponseSchema.unprocessable(res, err);
    }
    next();
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
  static validateChangeLocation(req, res, next) {
    joi.validate(req.body, changeLocationSchema)
      .then(() => next())
      .catch(err => ResponseSchema.unprocessable(res, err));
  }
}

export default ParcelValidator;
