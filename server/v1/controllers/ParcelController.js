import ParcelModel from '../../models/Parcel';
import Response from '../helpers/Response';
import ParcelEmitter, {
  PARCEL_STATUS_UPDATE,
  PARCEL_LOCATION_UPDATE,
} from '../helpers/events/ParcelEmitter';


const Parcel = new ParcelModel();

/**
 * @export
 * @class ParcelController
 */
class ParcelController {
  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async getAll(req, res) {
    const allRecords = await Parcel.getAll();

    return Response.success(res, allRecords);
  }

  /**
   *
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async listForUser(req, res) {
    let { userId } = req.params;
    userId = Number(userId);
    const allRecords = await Parcel.where({ placedBy: userId }).getAll();

    return Response.success(res, allRecords);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async create(req, res) {
    const weightCategories = {
      '5-15': '2,000',
      '16-50': '4,000',
      '51-80': '5,000',
      '81-100': '10,000'
    };
    const newParcelData = req.body;
    const userId = req.decoded.id;
    // as parcel orders are created, they are initially given a status of 'placed'
    newParcelData.status = 'placed';
    newParcelData.placedBy = userId;

    const { weight } = newParcelData;
    let cost;
    if (weight >= 5 && weight <= 15) {
      cost = `N${weightCategories['5-15']}`;
    } else if (weight >= 16 && weight <= 50) {
      cost = `N${weightCategories['16-50']}`;
    } else if (weight >= 51 && weight <= 80) {
      cost = `N${weightCategories['51-80']}`;
    } else if (weight >= 81 && weight <= 100) {
      cost = `N${weightCategories['81-100']}`;
    } else {
      cost = `N${weightCategories['81-100']}`;
    }

    newParcelData.cost = cost;
    const newParcel = await Parcel.create(newParcelData);

    return Response.success(res, newParcel);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async getOne(req, res) {
    let { parcelId } = req.params;
    parcelId = Number(parcelId);
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return Response.notFound(res);
    }

    return Response.success(res, parcel);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async cancel(req, res) {
    const { parcelId } = req.params;
    const updateData = req.body;

    updateData.status = 'cancelled';
    const updatedParcel = await Parcel.update(parcelId, updateData);

    return Response.success(res, updatedParcel);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async changeDestination(req, res) {
    const { parcelId } = req.params;
    const updateData = req.body;
    const updatedParcel = await Parcel.update(parcelId, updateData);

    return Response.success(res, updatedParcel);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async changeLocation(req, res) {
    const { parcelId } = req.params;
    const updateData = req.body;

    const updatedParcel = await Parcel.update(parcelId, updateData);

    ParcelEmitter.publish(PARCEL_LOCATION_UPDATE, updatedParcel);

    return Response.success(res, updatedParcel);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async changeStatus(req, res) {
    let { parcelId } = req.params;
    const updateData = req.body;
    parcelId = Number(parcelId);
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return Response.notFound(res);
    }

    const updatedParcel = await Parcel.update(parcelId, updateData);

    ParcelEmitter.publish(PARCEL_STATUS_UPDATE, updatedParcel);

    return Response.success(res, updatedParcel);
  }
}

export default ParcelController;
