import allParcelRecords, { attributes } from '../data/parcels';
import Model from './Model';

class Parcel extends Model {
  constructor(entityAttributes = attributes, allRecords = allParcelRecords) {
    super(entityAttributes, allRecords);
  }
}

export default Parcel;
