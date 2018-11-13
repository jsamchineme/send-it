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
  static getAll(req, res) {
    const allRecords = Parcel.getAll();

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
  static listForUser(req, res) {
    let { userId } = req.params;
    userId = Number(userId);
    const allRecords = Parcel.where({ userId }).getAll();

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
  static create(req, res) {
    const newParcelData = req.body;
    // as parcel orders are created, they are initially given a status of 'pending'
    newParcelData.status = 'pending';
    const newParcel = Parcel.create(newParcelData);

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
  static getOne(req, res) {
    let { orderId } = req.params;
    orderId = Number(orderId);
    const parcel = Parcel.findById(orderId);

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
  static update(req, res) {
    let { orderId } = req.params;
    const updateData = req.body;
    orderId = Number(orderId);
    const parcel = Parcel.findById(orderId);

    if (!parcel) {
      return res.status(400).json({
        message: 'NotFound',
      });
    }

    const updatedParcel = Parcel.update(orderId, updateData);

    return res.status(200).json({
      message: 'success',
      data: updatedParcel,
    });
  }
}

export default ParcelController;
