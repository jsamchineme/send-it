
const userSchema = {
  tableName: 'users',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    { name: 'username', type: 'string', length: 100 },
    { name: 'userType', type: 'string', length: 20 },
    { name: 'email', type: 'string', length: 100 },
    { name: 'password', type: 'string', length: 100 },
    { name: 'active', type: 'integer' },
    { name: 'createdAt', type: 'timestamp', default: 'currentTime' },
    { name: 'updatedAt', type: 'timestamp', default: 'currentTime' },
  ],
};

export default userSchema;
