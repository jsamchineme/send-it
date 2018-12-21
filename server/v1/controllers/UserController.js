import UserModel from '../../models/User';
import ParcelModel from '../../models/Parcel';
import Response from '../helpers/Response';

const User = new UserModel();
const Parcel = new ParcelModel();

/**
 * @export
 * @class UserController
 */
class UserController {
  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async getProfile(req, res) {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const transitingParcels = await Parcel.where({ userId, status: 'transiting' }).count();
    const deliveredParcels = await Parcel.where({ userId, status: 'delivered' }).count();
    const placedParcels = await Parcel.where({ userId, status: 'placed' }).count();
    const cancelledParcels = await Parcel.where({ userId, status: 'cancelled' }).count();

    delete user.password;
    delete user.isAdmin;

    user.parcels = {
      transiting: transitingParcels,
      placed: placedParcels,
      delivered: deliveredParcels,
      cancelled: cancelledParcels,
    };

    return Response.success(res, user);
  }
}

export default UserController;
