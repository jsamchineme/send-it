import ParcelModel from '../../models/Parcel';
import Response from '../helpers/Response';

const Parcel = new ParcelModel();

/**
 * @class
 */
class Roles {
  /**
   * @static
   * @param {Object} req - request received
   * @param {Object} res - response retunred
   * @param {Object} next - next middleware
   * @return {Object} - response with error messages
   */
  static isAdmin(req, res, next) {
    const user = req.decoded;

    if (user.userType === 'admin') {
      next();
    } else {
      return Response.unauthorised(res);
    }
  }

  /**
   * @static
   * @param {Object} req - request received
   * @param {Object} res - response retunred
   * @param {Object} next - next middleware
   * @return {Object} - response with error messages
   */
  static async isParcelOwner(req, res, next) {
    const user = req.decoded;
    const { parcelId } = req.params;
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return Response.notFound(res);
    }

    const foundParcel = await Parcel.where({ userId: user.id, id: parcelId }).getOne();

    if (foundParcel) {
      next();
    } else {
      return Response.unauthorised(res);
    }
  }

  /**
   * @static
   * @param {Object} req - request received
   * @param {Object} res - response retunred
   * @param {Object} next - next middleware
   * @return {Object} - response with error messages
   */
  static async isRightUser(req, res, next) {
    const user = req.decoded;
    const { userId } = req.params;
    const isRightUser = user.id === Number(userId);

    // this parcel is found for the user
    // OR authenticated user is an admin
    if (isRightUser || user.userType === 'admin') {
      next();
    } else {
      return Response.unauthorised(res);
    }
  }
}

export default Roles;
