
const userSchema = {
  tableName: 'users',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    { name: 'username', type: 'string', length: 100 },
    { name: 'email', type: 'string', length: 100 },
    { name: 'password', type: 'string', length: 100 },
    { name: 'createdAt', type: 'timestamp', default: 'currentTime' },
    { name: 'updatedAt', type: 'timestamp', default: 'currentTime' },
  ],
};

export default userSchema;
