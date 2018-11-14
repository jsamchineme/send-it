import bcrypt from 'bcryptjs';
import UserModel from '../models/User';

const User = new UserModel();

/**
 * @class UserSeeder
 */
class UserSeeder {
  /**
   * @returns {Array} - created users
   */
  static async seedUsers() {
    const dummyUsers = [
      {
        username: 'johndoe',
        email: 'johndoe@example.io',
        password: bcrypt.hashSync('secret', 10),
      },
      {
        username: 'samcotech',
        email: 'samcotech@example.io',
        password: bcrypt.hashSync('secret', 10),
      },
      {
        username: 'jaden',
        email: 'jaden@example.io',
        password: bcrypt.hashSync('secret', 10),
      },
    ];

    const users = dummyUsers.map(async (item) => {
      const user = item;
      const newOrder = await User.create(user);
      return newOrder;
    });

    const createdUsers = await Promise.all(users);
    return createdUsers;
  }
}

export default UserSeeder;
