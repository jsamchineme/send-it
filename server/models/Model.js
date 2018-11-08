/**
 * This makes CRUD and other data related methods available to the entities
 * that will inherit this class
 * @export
 * @class Model
 */
class Model {
  /**
   * @param {Array} entityAttributes - the attributes of an entity
   * @param {Array} allRecords - all the records available for an entity
   */
  constructor(entityAttributes, allRecords) {
    this.attributes = entityAttributes;
    this.allRecords = allRecords;
    this.whereConstraints = {};
  }

  /**
   * @returns {Array} - all the records available for an entity
   */
  getAll() {
    const constraintsExist = Object.keys(this.whereConstraints).length > 0;
    let records = this.allRecords;
    if (constraintsExist) {
      // iterate over the object keys available on the whereConstraint object
      // and check if the values of the attributes equal to the values of any items in
      // array of records
      records = this.allRecords.filter((item) => {
        let constraintsPassed = 0;
        for (const attribute in this.whereConstraints) {
          /* istanbul ignore else  */
          if (this.attributes.includes(attribute)) {
            if (item[attribute] === this.whereConstraints[attribute]) {
              constraintsPassed = constraintsPassed + 1;
            }
          }
        }
        // after the iteration and checks, if the number of passed constraints
        // is equal to the length of the keys in this.whereConstraints
        // then, the item can be added to the found records
        if (constraintsPassed === Object.keys(this.whereConstraints).length) {
          return true;
        }
        return false;
      });
    }

    // reset the constraints for other queries
    this.resetConstraints();
    return records;
  }

  /**
   * reset the constraints
   * @returns {Model} - the instance of this Model class facilitating method chainability
   */
  resetConstraints() {
    this.whereConstraints = {};
    return this;
  }

  /**
   * @param {Object} constraints - an object of attributes: values
   * @returns {Model} - the instance of this Model class facilitating method chainability
   */
  where(constraints) {
    for (const attribute in constraints) {
      /* istanbul ignore else  */
      if (this.attributes.includes(attribute)) {
        this.whereConstraints[attribute] = constraints[attribute];
      }
    }
    return this;
  }

  /**
   * @param {Number} id - the id of the record to be selected
   * @returns {Object} - the selected record
   */
  findById(id) {
    return this.allRecords.find(item => item.id === id);
  }

  /**
   * @param {*} attribute - the name of the attribute to be used for selecting record
   * @param {*} value - the value of the attribute
   * @returns {Object} - the selected record
   */
  findByAttribute(attribute, value) {
    if (attribute === undefined || value === undefined) {
      return undefined;
    }
    return this.allRecords.find(item => item[attribute] === value);
  }

  /**
   * @param {Object} data - an object of attributes: value
   * @returns {Object} - the just created record
   */
  create(data) {
    const newRecord = {};

    for (const attribute in data) {
      /* istanbul ignore else  */
      if (this.attributes.includes(attribute)) {
        newRecord[attribute] = data[attribute];
      }
    }
    newRecord.createdAt = new Date();
    newRecord.updatedAt = new Date();

    const lastRecord = this.allRecords[this.allRecords.length - 1];
    newRecord.id = lastRecord.id + 1;

    this.allRecords.push(newRecord);

    return newRecord;
  }

  /**
   * @param {Number} id - the id of the record to be updated
   * @param {Object} newAttributesData - object of attributes: new value
   * @returns {Object} - the updated record
   */
  update(id, newAttributesData) {
    // record to be updated
    const record = this.allRecords.find(item => item.id === id);

    for (const attribute in newAttributesData) {
      /* istanbul ignore else  */
      if (this.attributes.includes(attribute)) {
        /* istanbul ignore else  */
        if (attribute !== 'createdAt' && attribute !== 'updatedAt' && attribute !== 'id') {
          record[attribute] = newAttributesData[attribute];
        }
      }
    }
    record.updatedAt = new Date();

    // load the updated record back into the into "allRecords" property for the Entity
    const currentAllRecords = this.allRecords.map((item) => {
      if (item.id === record.id) {
        return record;
      }
      return item;
    });

    this.allRecords = currentAllRecords;

    return record;
  }

  /**
   * @param {Number} id - the id of the record to be deleted
   * @returns {Boolean} - success or failure flag
   */
  delete(id) {
    if (typeof id === 'undefined') {
      return false;
    }
    // fetch the records skipping the single one to be deleted
    const remainingRecords = this.allRecords.filter(item => item.id !== id);

    /**
     * this will be true if nothing was matched in the filter above,
     * and hence nothing was deleted
     */
    if (this.allRecords.length === remainingRecords.length) {
      return false;
    }

    // update the allRecords property of the Entity to reflect the current state
    this.allRecords = remainingRecords;
    return true;
  }
}

export default Model;
