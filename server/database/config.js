import { Pool } from 'pg';

const dotenv = require('dotenv');
const debug = require('debug')('database');

dotenv.config();

const databaseConfig = {
  development: process.env.DEV_DATABASE_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

export const DATABASE_URL = databaseConfig[process.env.NODE_ENV];

debug(`ENVIRONMENT:: "${process.env.NODE_ENV}"`);

let pool;
/**
 * using the heroku database in "production" environment required
 * setting the ssl property to true for the connection to succeed
 */
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: true,
  });
} else {
  pool = new Pool({
    connectionString: DATABASE_URL,
  });
}


pool.on('connect', () => {
  debug('CONNECTED TO DATABASE');
});

pool.on('error', (err) => {
  debug('ERROR--', err.stack);
  process.exit(-1);
});

export const connection = {
  query: async (queryString) => {
    const client = await pool.connect();
    try {
      const res = await client.query(queryString);
      debug('RESPONSE', res);
      return res;
    } finally {
      client.release();
    }
  },
};
