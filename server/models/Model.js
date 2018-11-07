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
  }

  /**
   * @returns {Array} - all the records available for an entity
   */
  getAll() {
    return this.allRecords;
  }

  /**
   * @param {Number} id - the id of the record to be selected
   * @returns {Object} - the selected record
   */
  findById(id) {
    return this.allRecords.find(item => item.id === id);
  }

  /**
   * @param {Object} data - an object of attributes: value
   * @returns {Object} - the just created record
   */
  create(data) {
    const newRecord = {};

    for (const attribute in data) {
      if (this.attributes.includes(attribute)) {
        newRecord[attribute] = data[attribute];
        if (attribute === 'createdAt') {
          newRecord[attribute] = new Date();
        }
        if (attribute === 'updatedAt') {
          newRecord[attribute] = new Date();
        }
      }
    }
    const lastRecord = this.allRecords[this.allRecords.length - 1];
    newRecord.id = lastRecord.id;

    this.allRecords.push(newRecord);

    return newRecord;
  }

  /**
   * @param {Number} id - the id of the record to be updated
   * @param {Object} newAttributesData - object of attributes: new value
   * @returns {Object} - the updated record
   */
  update(id, newAttributesData) {
    const record = this.allRecords.find(item => item.id === id);

    for (const attribute in newAttributesData) {
      if (this.attributes.includes(attribute)) {
        if (attribute !== 'createdAt' && attribute !== 'updatedAt' && attribute !== 'id') {
          record[attribute] = newAttributesData[attribute];
        }
      }
    }

    record.updateAt = new Date();

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
    if (this.allRecords === remainingRecords.length) {
      return false;
    }

    // update the allRecords property of the Entity to reflect the current state
    this.allRecords = remainingRecords;
    return true;
  }
}

export default Model;
