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
}

export default ParcelController;
