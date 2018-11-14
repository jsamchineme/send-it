import userSchema from '../migrations/users';
import Model from './Model';


/**
 * @class User
 * @extends {Model}
 */
class User extends Model {
  /**
   * Setup the User Model
   * @param {Array} schema - an object showing tableName and attributes of the entity
   */
  constructor(schema = userSchema) {
    super(schema);
  }
}

export default User;
