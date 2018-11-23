import faker from 'faker';
import UserModel from '../models/User';
import ParcelModel from '../models/Parcel';

const User = new UserModel();
const Parcel = new ParcelModel();

/**
 * Parcel Seeder
 */
class ParcelSeeder {
  /**
   * @returns {Array} - array of userIds
   */
  static async getUserIds() {
    const users = await User.getAll();
    const userIdsArray = users.map(item => item.id);
    return userIdsArray;
  }

  /**
   * @returns {Array} - created orders
   */
  static async seedParcels() {
    const userIdsArray = await this.getUserIds();

    const dummyParcels = [
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'description for delivered item',
        status: 'delivered',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
      {
        userId: faker.helpers.randomize(userIdsArray),
        description: 'some description of the item in the order',
        status: 'transiting',
        deliveryLocation: '5 pack street, Lagos',
        to: '5 Victoria Land Street, Ikeja',
        from: '5 Victoria Land Street, Ikeja',
        presentMapPointer: '45234232323',
      },
    ];

    const orders = dummyParcels.map(async (item) => {
      const order = item;
      const newOrder = await Parcel.create(order);
      return newOrder;
    });

    const createdOrders = await Promise.all(orders);
    return createdOrders;
  }
}

export default ParcelSeeder;
