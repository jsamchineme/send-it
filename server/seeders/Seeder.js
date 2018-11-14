import UserSeeder from './UserSeeder';
import ParcelSeeder from './ParcelSeeder';

/**
 * This class handle seeding of all database table
 * @export
 * @class Seeder
 */
class Seeder {
  /**
   * Seed Tables
   * @returns {*} object
   */
  static async seedTables() {
    const userSeeds = await UserSeeder.seedUsers();
    const parcelSeeds = await ParcelSeeder.seedParcels();

    return {
      userSeeds,
      parcelSeeds,
    };
  }

  /**
   * @returns {Array} - seeded records
   */
  static async seed() {
    const seeds = await this.seedTables();
    return seeds;
  }
}


Seeder.seed();
