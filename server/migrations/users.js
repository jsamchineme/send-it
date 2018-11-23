
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
      name: 'firstname', type: 'string', length: 30,
    },
    {
      name: 'lastname', type: 'string', length: 30,
    },
    {
      name: 'othernames', type: 'string', length: 30,
    },
    {
      name: 'isAdmin', type: 'boolean', notNull: true, default: true,
    },
    {
      name: 'email', type: 'string', length: 100, notNull: true, unique: true,
    },
    {
      name: 'password', type: 'string', length: 100, notNull: true,
    },
    {
      name: 'verified', type: 'boolean', notNull: true, default: true
    },
    { name: 'registered', type: 'timestamp', default: 'currentTime' },
    { name: 'updated', type: 'timestamp', default: 'currentTime' },
  ],
};

export default userSchema;
