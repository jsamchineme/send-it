import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import ParcelModel from '../models/Parcel';

const User = new UserModel();
const Parcel = new ParcelModel();

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
        username: 'jsamchineme',
        email: 'jsamchineme@gmail.com',
        userType: 'client',
        active: 0,
        password: bcrypt.hashSync('secret', 10),
      },
      {
        username: 'samcotech',
        email: 'samcotech@example.io',
        userType: 'admin',
        active: 1,
        password: bcrypt.hashSync('secret', 10),
      },
      {
        username: 'jaden',
        email: 'jaden@example.io',
        userType: 'client',
        active: 0,
        password: bcrypt.hashSync('secret', 10),
      },
    ];

    const users = dummyUsers.map(async (item) => {
      const user = item;
      const newUser = await User.create(user);

      const dummyParcels = [
        {
          userId: newUser.id,
          description: 'description for delivered item',
          status: 'delivered',
          deliveryLocation: '5 pack street, Lagos',
          presentLocation: '5 Victoria Land Street, Ikeja',
          pickupLocation: '5 Victoria Land Street, Ikeja',
          presentMapPointer: '45234232323',
        },
        {
          userId: newUser.id,
          description: 'some description of the item in the order',
          status: 'pending_delivery',
          deliveryLocation: '5 pack street, Lagos',
          presentLocation: '5 Victoria Land Street, Ikeja',
          pickupLocation: '5 Victoria Land Street, Ikeja',
          presentMapPointer: '45234232323',
        },
      ];

      const orders = dummyParcels.map(async (item) => {
        const order = item;
        const newOrder = await Parcel.create(order);
        return newOrder;
      });

      const createdOrders = await Promise.all(orders);
      newUser.orders = createdOrders;
      return newUser;
    });

    const createdUsers = await Promise.all(users);
    return createdUsers;
  }
}

export default UserSeeder;
