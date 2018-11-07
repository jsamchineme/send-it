import ParcelModel from '../../models/Parcel';

const Parcel = new ParcelModel();

/**
 * Parcel
 */
class ParcelController {
  /**
   *
   * @param {Object} req - request received
   * @param {Object} res - response object
   * @returns {Object} response object
   */
  static list(req, res) {
    const allRecords = Parcel.getAll();

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
  static store(req, res) {
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
  static show(req, res) {
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
  static cancel(req, res) {
    let { orderId } = req.params;
    orderId = Number(orderId);
    const parcel = Parcel.findById(orderId);

    if (!parcel) {
      return res.status(400).json({
        message: 'NotFound',
      });
    }

    // orders are never deleted, the status is only changed to "cancelled"
    parcel.status = 'cancelled';
    const cancelledParcel = Parcel.update(orderId, parcel);

    return res.status(200).json({
      message: 'success',
      data: cancelledParcel,
    });
  }
}

export default ParcelController;
