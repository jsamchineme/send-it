import ParcelModel from '../../models/Parcel';

const Parcel = new ParcelModel();

/**
 * @export
 * @class ParcelController
 */
class ParcelController {
  /**
   *
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async getAll(req, res) {
    const allRecords = await Parcel.getAll();

    return res.status(200).json({
      message: 'success',
      data: allRecords,
    });
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

    return res.status(200).json({
      message: 'success',
      data: allRecords,
    });
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async create(req, res) {
    const newParcelData = req.body;
    // as parcel orders are created, they are initially given a status of 'pending'
    newParcelData.status = 'pending';
    const newParcel = await Parcel.create(newParcelData);

    return res.status(200).json({
      message: 'success',
      data: newParcel,
    });
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async getOne(req, res) {
    let { orderId } = req.params;
    orderId = Number(orderId);
    const parcel = await Parcel.findById(orderId);

    if (!parcel) {
      return res.status(400).json({
        message: 'NotFound',
      });
    }

    return res.status(200).json({
      message: 'success',
      data: parcel,
    });
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async update(req, res) {
    let { orderId } = req.params;
    const updateData = req.body;
    orderId = Number(orderId);
    const parcel = await Parcel.findById(orderId);

    if (!parcel) {
      return res.status(400).json({
        message: 'NotFound',
      });
    }

    const updatedParcel = await Parcel.update(orderId, updateData);

    return res.status(200).json({
      message: 'success',
      data: updatedParcel,
    });
  }

  /**
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static async cancel(req, res) {
    let { orderId } = req.params;
    const updateData = req.body;
    orderId = Number(orderId);
    const parcel = await Parcel.findById(orderId);

    if (!parcel) {
      return res.status(400).json({
        message: 'NotFound',
      });
    }

    updateData.status = 'cancelled';
    const updatedParcel = await Parcel.update(orderId, updateData);

    return res.status(200).json({
      message: 'success',
      data: updatedParcel,
    });
  }
}

export default ParcelController;
