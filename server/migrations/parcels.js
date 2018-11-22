
const parcelSchema = {
  tableName: 'parcels',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    {
      name: 'userId', type: 'integer', notNull: true,
    },
    { name: 'description', type: 'string', length: 200 },
    {
      name: 'status', type: 'string', length: 30, notNull: true,
    },
    {
      name: 'deliveryLocation', type: 'string', length: 200, notNull: true,
    },
    {
      name: 'presentLocation', type: 'string', length: 200, notNull: true,
    },
    {
      name: 'pickupLocation', type: 'string', length: 200, notNull: true,
    },
    { name: 'presentMapPointer', type: 'text' },
    { name: 'createdAt', type: 'timestamp', default: 'currentTime' },
    { name: 'updatedAt', type: 'timestamp', default: 'currentTime' },
  ],
};

export default parcelSchema;
