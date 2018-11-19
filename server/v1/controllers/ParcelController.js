import ParcelModel from '../../models/Parcel';
import Response from '../utils/Response';

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
    const allRecords = await Parcel.where({ userId }).getAll();

    return Response.success(res, allRecords);
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async create(req, res) {
    const newParcelData = req.body;
    const userId = req.decoded.id;
    // as parcel orders are created, they are initially given a status of 'pending'
    newParcelData.status = 'pending';
    newParcelData.userId = userId;
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
  static async update(req, res) {
    let { parcelId } = req.params;
    const updateData = req.body;
    parcelId = Number(parcelId);
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return Response.notFound(res);
    }

    const updatedParcel = await Parcel.update(parcelId, updateData);

    return Response.success(res, updatedParcel);
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
  static async changeStatus(req, res) {
    let { parcelId } = req.params;
    const updateData = req.body;
    parcelId = Number(parcelId);
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return Response.notFound(res);
    }

    const updatedParcel = await Parcel.update(parcelId, updateData);

    return Response.success(res, updatedParcel);
  }
}

export default ParcelController;
