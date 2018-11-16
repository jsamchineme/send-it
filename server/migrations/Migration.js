import { connection } from '../database/config';

const debug = require('debug')('database');

/**
 * Prepare the database for the app
 */
export default class Migration {
  /**
   * instantiate the class
   * @param {Array} tableSchemas - an array of tables to be saved
   */
  constructor(tableSchemas) {
    this.tables = tableSchemas;
    this.connection = connection;

    this.prepareCreateQuery();
  }

  /**
   * @returns {Migration} - the current istance
   */
  async dropTables() {
    let queryString = '';
    this.tables.forEach((schema) => {
      const query = `DROP TABLE IF EXISTS ${schema.tableName};`;
      queryString += query;
    });

    const result = await this.connection.query(queryString);

    debug('tables reset result::', result);
    return this;
  }

  /**
   *
   * @param {String} query - string of the prepared query
   * @returns {Migration} - the current instance
   */
  async createTables(query = this.createQuery) {
    const result = await this.connection.query(query);

    debug('tables migration result::', result);
    return this;
  }

  /**
   * prepare table queries
   * @returns {String} - the prepared query Text
   */
  prepareCreateQuery() {
    let queryString = '';
    this.tables.forEach((schema, index) => {
      const query = `CREATE TABLE IF NOT EXISTS ${schema.tableName} (
        ${this.prepareAllFields(schema.attributes)}
      )`;
      queryString += query;
      // if the attribute is not the last one, add semi-colon to show end of query
      // so that other queries that be added
      if (index !== this.tables.length - 1) {
        queryString += '; \n';
      }
    });
    this.createQuery = queryString;
    return queryString;
  }

  /**
   * @param {Object} attribute - object of attribute properties
   * @returns {Migration} - current instance
   */
  prepareEachField(attribute) {
    let fieldRow = `"${attribute.name}"`;
    if (attribute.type === 'integer') {
      fieldRow += ' integer ';
    }
    if (attribute.type === 'string') {
      fieldRow += ` varchar(${attribute.length}) `;
    }
    if (attribute.type === 'text') {
      fieldRow += ' TEXT ';
    }
    if (attribute.type === 'timestamp') {
      fieldRow += ' timestamptz ';
    }
    if (attribute.autoIncrement !== undefined) {
      fieldRow += ' SERIAL ';
    }
    if (attribute.primaryKey === true) {
      fieldRow += ' PRIMARY KEY ';
    }
    if (attribute.references !== undefined) {
      fieldRow += ` REFERENCES ${attribute.on}(${attribute.references}) `;
    }
    if (attribute.nullable !== undefined) {
      fieldRow += ' NOT NULL ';
    }
    if (attribute.default === 'currentTime') {
      fieldRow += ' DEFAULT CURRENT_TIMESTAMP ';
    }

    return fieldRow;
  }

  /**
   * @param {Array} attributes - Array of attribute objects
   * @returns {Migration} - current instance
   */
  prepareAllFields(attributes) {
    let rows = '';
    let preparedField = '';
    attributes.forEach((attribute, index) => {
      preparedField = this.prepareEachField(attribute);
      rows = rows + preparedField;
      // if the attribute is not the last one, add comma after it
      if (index !== attributes.length - 1) {
        rows += ', \n';
      }
    });

    return rows;
  }
}
