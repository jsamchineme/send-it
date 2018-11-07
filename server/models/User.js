import allUserRecords, { attributes } from '../data/users';
import Model from './Model';


/**
 * @class User
 * @extends {Model}
 */
class User extends Model {
  /**
   * Setup the User Model
   * @param {Array} entityAttributes - the attributes of the entity
   * @param {Array} allRecords - all the records available for the entity
   */
  constructor(entityAttributes = attributes, allRecords = allUserRecords) {
    super(entityAttributes, allRecords);
  }
}

export default User;
