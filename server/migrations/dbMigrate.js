import Migration from './Migration';
import parcels from './parcels';
import users from './users';

const tableSchemas = [
  users,
  parcels,
];

const migration = new Migration(tableSchemas);

migration.createTables();

export default migration;
