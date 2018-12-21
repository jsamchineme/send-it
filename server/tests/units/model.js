import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import ParcelModel from '../../models/Parcel';
import UserModel from '../../models/User';

const modelTests = () => {
  const User = new UserModel();
  const Parcel = new ParcelModel();
  describe('Test Cases for the Database Model Class', () => {
    it('should Instantiate Model', () => {
      expect(User.schema.tableName === 'users').to.equal(true);
    });
    describe('Model.findById()', () => {
      let record;
      it('should return a record when valid id is supplied', async () => {
        const newRecordData = {
          username: 'johndoe1',
          email: 'johndoe1@example.io',
          password: 'asdadsds',
          isAdmin: true,
          verified: false,
        };
        // create a record first
        const result = await User.create(newRecordData);
        // try to find the record
        record = await User.findById(result.id);
        expect(record.id).to.equal(result.id);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
    describe('Model.count()', () => {
      let record;
      it('should return count for selected model', async () => {
        const newRecordData = {
          username: 'johndoe12',
          email: 'johndoe12@example.io',
          password: 'asdadsds',
          isAdmin: true,
          verified: false,
        };
        // create a record first
        record = await User.create(newRecordData);
        // try to find the record
        const result = await User.count();
        expect(Number(result.count) > 0).to.equal(true);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
    describe('Model.getAll()', () => {
      let record;
      it('should return all records', async () => {
        record = await User.create({
          username: 'johndoe31',
          email: 'johndoe31@example.io',
          password: 'asdadsds',
        });
        const allReturnedRecords = await User.getAll();
        expect(typeof allReturnedRecords === 'object').to.equal(true);
        expect(allReturnedRecords.length > 0).to.equal(true);
      });
      it('should return selected records when where constraints are set', async () => {
        const records = await User.where({
          username: record.username,
          email: record.email
        }).getAll();
        expect(records.length > 0).to.equal(true);
        expect(typeof records === 'object').to.equal(true);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
    describe('Model.getOne()', () => {
      let record;
      it('should return all records', async () => {
        record = await User.create({
          username: 'johndoe3',
          email: 'johndoe3@example.io',
          password: 'asdadsds',
        });
        const returnedRecord = await User.getOne();
        expect(returnedRecord.id > 0).to.equal(true);
        expect(typeof returnedRecord === 'object').to.equal(true);
      });
      it('should return selected records when where constraints are set', async () => {
        const returnedRecord = await User.where({
          username: record.username,
          email: record.email
        }).getOne();
        expect(returnedRecord.id > 0).to.equal(true);
        expect(typeof returnedRecord === 'object').to.equal(true);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
    describe('Model.create()', () => {
      let record;
      it('should create records when data is supplied', async () => {
        const user = await User.create({
          username: 'johndoe4',
          email: 'johndoe4@example.io',
          password: 'secretpass',
          isAdmin: false,
          verified: false,
        });
        record = user;
        expect(user.id > 0).to.equal(true);
      });
      after(async () => {
        await User.delete(record.id);
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
        const data = { placedBy: 1, status: 'transiting' };
        Parcel.where(data);
        const whereString = Parcel.getWhereString();
        expect(whereString).to.equal(`"placedBy" = ${data.placedBy} AND "status" = '${data.status}'`);
      });
    });
    describe('Model.prepareUpdateSet()', () => {
      it('should prepare update SET string', async () => {
        let data = { status: 'transiting' };
        let preparedUpdateSet = Parcel.prepareUpdateSet(data);
        expect(preparedUpdateSet).to.equal(`SET "status" = '${data.status}'`);
        data = { to: 'location', status: 'transiting' };
        preparedUpdateSet = Parcel.prepareUpdateSet(data);
        expect(preparedUpdateSet).to.equal(`SET "to" = '${data.to}', "status" = '${data.status}'`);
      });
    });
    describe('Model.update()', () => {
      let record;
      it('should return a record when valid attribute is supplied', async () => {
        record = await User.create({
          username: 'johndoe5',
          email: 'johndoe5@example.io',
          password: 'asdadsds',
        });
        const data = {
          email: 'johndoesss@example.io',
          verified: false,
        };
        const result = await User.update(record.id, data);
        expect(result.id).to.equal(record.id);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
    describe('Model.delete()', () => {
      let record;
      it('should delete records when data is supplied', async () => {
        record = await User.create({
          username: 'johndoe6',
          email: 'johndoe6@example.io',
          isAdmin: false,
          verified: false,
          password: 'secretpass',
        });
        const result = await User.delete(record.id);
        expect(result).to.equal(true);
      });
      it('should return false when no item is found to be deleted', async () => {
        const result = await User.delete(record.id);
        expect(result).to.equal(false);
      });
      after(async () => {
        await User.delete(record.id);
      });
    });
  });
};

modelTests();
