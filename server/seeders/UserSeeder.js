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
        isAdmin: false,
        verified: false,
        password: bcrypt.hashSync('secretpass', 10),
      },
      {
        username: 'samcotech',
        email: 'samcotech@example.io',
        isAdmin: true,
        verified: true,
        password: bcrypt.hashSync('secretpass', 10),
      },
      {
        username: 'jadenuser',
        email: 'jaden@example.io',
        isAdmin: false,
        verified: false,
        password: bcrypt.hashSync('secretpass', 10),
      },
    ];

    const users = dummyUsers.map(async (item) => {
      const user = item;
      const newUser = await User.create(user);

      const dummyParcels = [
        {
          placedBy: newUser.id,
          description: 'description for delivered item',
          status: 'transiting',
          currentLocation: '5 Victoria Land Street, Ikeja',
          from: '5 Victoria Land Street, Ikeja',
          to: '5 pack street, Lagos',
          weight: 54,
          cost: 'N2,000',
          presentMapPointer: '45234232323',
        },
        {
          placedBy: newUser.id,
          description: 'some description of the item in the order',
          status: 'transiting',
          currentLocation: '5 Victoria Land Street, Ikeja',
          from: '5 Victoria Land Street, Ikeja',
          to: '5 pack street, Lagos',
          weight: 50,
          cost: 'N2,000',
          presentMapPointer: '45234232323',
        },
      ];

      const orders = dummyParcels.map(async (parcel) => {
        const order = parcel;
        await Parcel.create(order);
      });

      await Promise.all(orders);
    });

    await Promise.all(users);
  }
}

export default UserSeeder;
