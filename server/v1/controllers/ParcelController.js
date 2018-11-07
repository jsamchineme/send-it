import ParcelModel from '../../models/Parcel';

const Parcel = new ParcelModel();

class ParcelController {
  static getAll(req, res) {
    const allRecords = Parcel.getAll();

    return res.status(200).json({
      message: 'success',
      data: allRecords,
    });
  }
}

export default ParcelController;
