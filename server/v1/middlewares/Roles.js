import ParcelModel from '../../models/Parcel';
import Response from '../utils/Response';

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
    const foundParcel = await Parcel.where({ userId: user.id, id: parcelId }).getOne();

    if (foundParcel) {
      next();
    } else {
      return Response.unauthorised(res);
    }
  }
}

export default Roles;
