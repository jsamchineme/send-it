import allParcelRecords, { attributes } from '../data/parcels';
import Model from './Model';


/**
 * Handles data requests for the Product resource
 *
 * @class Product
 * @extends {Model}
 */
class Parcel extends Model {
  /**
   * Setup the Parcel Model
   * @param {Array} entityAttributes - the attributes of the entity
   * @param {Array} allRecords - all the records available for the entity
   */
  constructor(entityAttributes = attributes, allRecords = allParcelRecords) {
    super(entityAttributes, allRecords);
  }
}

export default Parcel;
