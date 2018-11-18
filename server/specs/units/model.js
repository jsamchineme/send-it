import { describe, it } from 'mocha';
import { expect } from 'chai';
import ParcelModel from '../../models/Parcel';
import UserModel from '../../models/User';

const modelTests = () => {
  const User = new UserModel();
  const Parcel = new ParcelModel();
  describe('Test Cases for the Database Model Class', () => {
    it('should Instantiate Model', () => {
      expect(User.schema.tableName !== undefined).to.equal(true);
    });
    describe('Model.findById()', () => {
      it('should return a record when valid id is supplied', async () => {
        const newRecordData = {
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        };
        // create a record first
        const result = await User.create(newRecordData);
        // try to find the record
        const record = await User.findById(result.id);
        expect(record.id).to.equal(result.id);
      });
    });
    describe('Model.getAll()', async () => {
      const allReturnedRecords = await User.getAll();
      it('should return all records', () => {
        expect(allReturnedRecords.length > 0).to.equal(true);
      });
      it('should return selected records when where constraints are set', async () => {
        const record = await User.create({
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        });
        const records = await User.where({ username: record.email, email: record.email }).getAll();
        expect(records.length > 0).to.equal(true);
      });
    });
    describe('Model.getOne()', async () => {
      const allReturnedRecords = await User.getOne();
      it('should return all records', () => {
        expect(allReturnedRecords.length > 0).to.equal(true);
      });
      it('should return selected records when where constraints are set', async () => {
        const record = await User.create({
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        });
        const records = await User.where({ username: record.email, email: record.email }).getOne();
        expect(records.length === 1).to.equal(true);
      });
    });
    describe('Model.create()', () => {
      it('should create records when data is supplied', async () => {
        const user = await User.create({
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
          active: 0,
        });
        expect(user.id > 0).to.equal(true);
      });
    });
    describe('Model.where()', () => {
      it('should set the where constraints', () => {
        User.where({ username: 'Attribute Name' });
        const constraintAttributes = Object.keys(User.whereConstraints);
        expect(constraintAttributes.length > 0).to.equal(true);
      });
    });
    describe('Model.resetConstraints()', () => {
      it('should reset the where constraints', () => {
        User.where({ username: 'Attribute Name' }).resetConstraints();
        const constraintAttributes = Object.keys(User.whereConstraints);
        expect(constraintAttributes.length).to.equal(0);
      });
    });
    describe('Model.findByAttribute()', () => {
      it('should return a record when valid attribute is supplied', async () => {
        const result = await User.findByAttribute('id', 2);
        expect(result.id).to.equal(2);
      });
    });
    describe('Model.getWhereString()', () => {
      it('should get a whereString after preparing it', () => {
        Parcel.resetConstraints();
        const data = { userId: 1, status: 'pending_delivery' };
        Parcel.where(data);
        const whereString = Parcel.getWhereString();
        expect(whereString).to.equal(`"userId" = ${data.userId} AND "status" = '${data.status}'`);
      });
    });
    describe('Model.prepareUpdateSet()', () => {
      it('should prepare update SET string', async () => {
        let data = { status: 'pending_delivery' };
        let preparedUpdateSet = Parcel.prepareUpdateSet(data);
        expect(preparedUpdateSet).to.equal(`SET "status" = '${data.status}'`);
        data = { deliveryLocation: 'location', status: 'pending_delivery' };
        preparedUpdateSet = Parcel.prepareUpdateSet(data);
        expect(preparedUpdateSet).to.equal(`SET "deliveryLocation" = '${data.deliveryLocation}', "status" = '${data.status}'`);
      });
    });
    describe('Model.update()', () => {
      it('should return a record when valid attribute is supplied', async () => {
        const record = await User.create({
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        });
        const data = {
          email: 'johndoes@example.io',
          active: 1,
        };
        const result = await User.update(record.id, data);
        expect(result.id).to.equal(record.id);
      });
    });
    describe('Model.delete()', () => {
      let record;
      it('should delete records when data is supplied', async () => {
        record = await User.create({
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        });
        const result = await User.delete(record.id);
        expect(result).to.equal(true);
      });
      it('should return false when no item is found to be deleted', async () => {
        const result = await User.delete(record.id);
        expect(result).to.equal(false);
      });
    });
  });
};

modelTests();
