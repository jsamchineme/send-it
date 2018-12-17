
const parcelSchema = {
  tableName: 'parcels',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    {
      name: 'placedBy', type: 'integer', notNull: true,
    },
    { name: 'description', type: 'string', length: 200 },
    { name: 'weight', type: 'string', length: 200 },
    {
      name: 'weightmetric', type: 'string', length: 20, default: 'kg',
    },
    {
      name: 'cost', type: 'string', length: 20, notNull: true,
    },
    {
      name: 'contactPhone', type: 'string', length: 20
    },
    {
      name: 'contactEmail', type: 'string', length: 100
    },
    {
      name: 'status', type: 'string', length: 30, notNull: true,
    },
    {
      name: 'currentLocation', type: 'string', length: 200, notNull: true,
    },
    {
      name: 'to', type: 'string', length: 200, notNull: true,
    },
    {
      name: 'from', type: 'string', length: 200, notNull: true,
    },
    { name: 'presentMapPointer', type: 'text' },
    { name: 'sentOn', type: 'timestamp', default: 'currentTime' },
    { name: 'deliveredOn', type: 'timestamp', default: 'currentTime' },
  ],
};

export default parcelSchema;
