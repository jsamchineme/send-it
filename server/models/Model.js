import { connection } from '../database/config';

/**
 * This makes CRUD and other data related methods available to the entities
 * that will inherit this class
 * @export
 * @class Model
 */
class Model {
  /**
   * @param {Object} schema - an object showing tableName and attributes of an entity
   */
  constructor(schema) {
    this.schema = schema;
    this.connection = connection;
    this.whereConstraints = {};
  }

  /**
   * @returns {Array} - all the records available for an entity
   */
  async getAll() {
    const constraintsExist = Object.keys(this.whereConstraints).length > 0;

    let queryString;
    /* istanbul ignore if */
    if (constraintsExist) {
      const whereString = this.getWhereString();
      queryString = `SELECT * FROM ${this.schema.tableName} WHERE ${whereString}`;
    } else {
      queryString = `SELECT * FROM ${this.schema.tableName}`;
    }
    try {
      const resultSet = await this.connection.query(queryString);

      // reset the constraints for other queries
      this.resetConstraints();
      return resultSet.rows;
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @returns {Array} - all the records available for an entity
   */
  async count() {
    const constraintsExist = Object.keys(this.whereConstraints).length > 0;

    let queryString;
    /* istanbul ignore if */
    if (constraintsExist) {
      const whereString = this.getWhereString();
      queryString = `SELECT count(*) FROM ${this.schema.tableName} WHERE ${whereString}`;
    } else {
      queryString = `SELECT count(*) FROM ${this.schema.tableName}`;
    }
    try {
      const resultSet = await this.connection.query(queryString);

      // reset the constraints for other queries
      this.resetConstraints();
      return resultSet.rows[0];
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @returns {Array} - all the records available for an entity
   */
  async getOne() {
    const constraintsExist = Object.keys(this.whereConstraints).length > 0;

    let queryString;
    /* istanbul ignore if */
    if (constraintsExist) {
      const whereString = this.getWhereString();
      queryString = `SELECT * FROM ${this.schema.tableName} WHERE ${whereString} LIMIT 1`;
    } else {
      queryString = `SELECT * FROM ${this.schema.tableName} LIMIT 1`;
    }
    try {
      const resultSet = await this.connection.query(queryString);

      // reset the constraints for other queries
      this.resetConstraints();
      return resultSet.rows[0];
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * prepare the whereString
   * @returns {String} - the where String eg "field1" = "value1" AND "field2" = "value2";
   */
  getWhereString() {
    let whereString = '';
    let count = 0;
    const whereAttributes = Object.keys(this.whereConstraints);
    whereAttributes.forEach((attribute) => {
      const foundAttribute = this.schema.attributes.find(item => item.name === attribute);
      /* istanbul ignore else */
      if (foundAttribute) {
        let value;
        if (foundAttribute.type !== 'integer' && foundAttribute.autoIncrement === undefined) {
          value = `'${this.whereConstraints[attribute]}'`;
        } else {
          value = this.whereConstraints[attribute];
        }

        attribute = `"${attribute}"`;
        whereString += `${attribute} = ${value}`;

        // trying to find out if the iteration is the last
        if (count !== whereAttributes.length - 1) {
          whereString += ' AND ';
        }
      }
      count += 1;
    });

    return whereString;
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
    const theseConstraints = Object.keys(constraints);
    theseConstraints.forEach((attribute) => {
      /* istanbul ignore next */
      if (attribute) {
        const foundAttribute = this.schema.attributes.find(item => item.name === attribute);
        /* istanbul ignore if */
        if (foundAttribute) {
          this.whereConstraints[attribute] = constraints[attribute];
        }
      }
    });
    return this;
  }

  /**
   * @param {Number} id - the id of the record to be selected
   * @returns {Object} - the selected record
   */
  async findById(id) {
    const query = `SELECT * FROM ${this.schema.tableName} WHERE id = ${id}`;
    try {
      const resultSet = await this.connection.query(query);

      return resultSet.rows[0];
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @param {*} attribute - the name of the attribute to be used for selecting record
   * @param {*} value - the value of the attribute
   * @returns {Object} - the selected record
   */
  async findByAttribute(attribute, value) {
    const query = `SELECT * FROM ${this.schema.tableName} WHERE "${attribute}" = '${value}'`;
    try {
      const resultSet = await this.connection.query(query);

      return resultSet.rows[0];
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @param {Object} data - an object of attributes: value
   * @returns {Object} - the just created record
   */
  async create(data) {
    const createData = this.prepareCreateData(data);
    const { fieldList, fieldValues } = createData;
    const query = `INSERT INTO ${this.schema.tableName} (${fieldList}) VALUES (${fieldValues}) RETURNING *`;
    try {
      const resultSet = await this.connection.query(query);

      const newRecord = resultSet.rows[0];
      return newRecord;
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @param {Object} data - object of table fields: values
   * @returns {Object} - object of table fields: values
   */
  prepareCreateData(data) {
    const fieldList = [];
    const fieldValues = [];
    const fields = Object.keys(data);
    fields.forEach((field) => {
      /* istanbul ignore else */
      if (this.schema.attributes.find(item => item.name === field)) {
        const foundAttribute = this.schema.attributes.find(item => item.name === field);
        /* istanbul ignore else */
        if (foundAttribute.autoIncrement === undefined) {
          let value;
          if (foundAttribute.type !== 'integer') {
            value = `'${data[field]}'`;
          } else {
            value = data[field];
          }

          field = `"${field}"`;

          fieldValues.push(value);
          fieldList.push(field);
        }
      }
    });

    const preparedData = { fieldList, fieldValues };
    return preparedData;
  }

  /**
   * @param {Object} data - object of field updates
   * @return {String} - formatted Update "Set" String
   */
  prepareUpdateSet(data) {
    let preparedSetString = 'SET ';
    const fields = Object.keys(data);
    fields.forEach((field) => {
      const foundAttribute = this.schema.attributes.find(item => item.name === field);
      /* istanbul ignore else */
      if (foundAttribute) {
        let fieldSetString = '';
        if (preparedSetString !== 'SET ') {
          fieldSetString = ', ';
        }
        if (foundAttribute.type !== 'integer') {
          fieldSetString += `"${field}" = '${data[field]}'`;
        } else {
          fieldSetString += `"${field}" = ${data[field]}`;
        }
        preparedSetString += fieldSetString;
      }
    });
    // console.log(`--------${preparedSetString}--------`);
    return preparedSetString;
  }

  /**
   * @param {*} id - the id of the record
   * @param {Object} data - object containing field updates for the record
   * @returns {Object} - the updated record
   */
  async update(id, data) {
    const preparedUpdateSet = this.prepareUpdateSet(data);
    const queryString = `UPDATE ${this.schema.tableName} ${preparedUpdateSet} WHERE id = ${id} RETURNING *`;

    try {
      const resultSet = await this.connection.query(queryString);

      const updatedRecord = resultSet.rows[0];
      return updatedRecord;
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }

  /**
   * @param {*} id - the id of the record
   * @returns {Boolean} - success or failure boolean flag
   */
  async delete(id) {
    const queryString = `DELETE FROM ${this.schema.tableName} WHERE id = ${id}`;

    try {
      const result = await this.connection.query(queryString);

      if (result.rowCount === 1) {
        return true;
      }
      return false;
    } catch (err) {
      /* istanbul ignore next */
      return err.stack;
    }
  }
}

export default Model;
