import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    username: 'johndoe',
    email: 'johndoe@example.io',
    password: bcrypt.hashSync('secret', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    username: 'samcotech',
    email: 'samcotech@example.io',
    password: bcrypt.hashSync('secret', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    username: 'jaden',
    email: 'jaden@example.io',
    password: bcrypt.hashSync('secret', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const attributes = ['id', 'username', 'email', 'password', 'createdAt', 'updatedAt'];

export default users;
