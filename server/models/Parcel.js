import parcelSchema from '../migrations/parcels';
import Model from './Model';


/**
 * @class Parcel
 * @extends {Model}
 */
class Parcel extends Model {
  /**
   * Setup the Parcel Model
   * @param {Array} schema - an object showing tableName and attributes of the entity
   */
  constructor(schema = parcelSchema) {
    super(schema);
  }
}

export default Parcel;
