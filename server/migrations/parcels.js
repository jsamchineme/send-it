
const parcelSchema = {
  tableName: 'parcels',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    {
      name: 'userId', type: 'integer',
    },
    { name: 'description', type: 'string', length: 200 },
    { name: 'status', type: 'string', length: 30 },
    { name: 'deliveryLocation', type: 'string', length: 200 },
    { name: 'presentLocation', type: 'string', length: 200 },
    { name: 'pickupLocation', type: 'string', length: 200 },
    { name: 'presentMapPointer', type: 'text' },
    { name: 'createdAt', type: 'timestamp', default: 'currentTime' },
    { name: 'updatedAt', type: 'timestamp', default: 'currentTime' },
  ],
};

export default parcelSchema;
