
const userSchema = {
  tableName: 'users',
  attributes: [
    {
      name: 'id', autoIncrement: true, primaryKey: true,
    },
    {
      name: 'username', type: 'string', length: 100, notNull: true,
    },
    {
      name: 'userType', type: 'string', length: 20, notNull: true,
    },
    {
      name: 'email', type: 'string', length: 100, notNull: true, unique: true,
    },
    {
      name: 'password', type: 'string', length: 100, notNull: true,
    },
    { name: 'active', type: 'integer', notNull: true },
    { name: 'createdAt', type: 'timestamp', default: 'currentTime' },
    { name: 'updatedAt', type: 'timestamp', default: 'currentTime' },
  ],
};

export default userSchema;
