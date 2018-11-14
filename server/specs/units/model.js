import { describe, it } from 'mocha';
import { expect } from 'chai';
import Model from '../../models/Model';
import userSchema from '../../migrations/users';

const modelTests = () => {
  describe('Test Case for the Model Class', () => {
    const model = new Model(userSchema);
    it('should Instantiate Model', () => {
      expect(model.schema.tableName).to.not.equal(undefined);
    });
    describe('Model.findById()', () => {
      it('should return a record when valid id is supplied', async () => {
        const record = await model.findById(1);
        expect(record.id).to.equal(1);
      });
      it('should return undefined when no id is supplied', async () => {
        const record = await model.findById();
        expect(record).to.equal(undefined);
      });
    });
    describe('Model.getAll()', async () => {
      const allReturnedRecords = await model.getAll();
      it('should return all records', () => {
        expect(allReturnedRecords.length > 0).to.equal(true);
      });
      it('should return selected records when where constraints are set', async () => {
        const records = await model.where({ state: 'lagos' }).getAll();
        expect(records.length > 0).to.equal(true);
      });
    });
    describe('Model.create()', () => {
      it('should create records when data is supplied', async () => {
        const newRecordData = {
          username: 'johndoe',
          email: 'johndoe@example.io',
          password: 'asdadsds',
        };

        const result = await model.create(newRecordData);
        expect(result.username).to.equal('johndoe');
      });
    });
    describe('Model.delete()', () => {
      it('should delete records when data is supplied', async () => {
        const result = await model.delete(1);
        expect(result).to.equal(true);
      });
      it('should return false when no parameter is supplied', async () => {
        const result = await model.delete();
        expect(result).to.equal(false);
      });
      it('should return false when no item is found to be deleted', async () => {
        const result = await model.delete(0);
        expect(result).to.equal(false);
      });
    });
    describe('Model.where()', () => {
      it('should set the where constraints', () => {
        model.where({ name: 'Attribute Name' });
        const constraintAttributes = Object.keys(model.whereConstraints);
        expect(constraintAttributes.length).to.equal(1);
      });
    });
    describe('Model.resetConstraints()', () => {
      it('should reset the where constraints', () => {
        model.where({ name: 'Attribute Name' }).resetConstraints();
        const constraintAttributes = Object.keys(model.whereConstraints);
        expect(constraintAttributes.length).to.equal(0);
      });
    });
    describe('Model.findByAttribute()', () => {
      it('should return a record when valid attribute is supplied', async () => {
        const result = await model.findByAttribute('id', 2);
        expect(result.id).to.equal(2);
      });
      it('should return undefined when no attribute is supplied', async () => {
        const result = await model.findByAttribute();
        expect(result).to.equal(undefined);
      });
    });
  });
};

export default modelTests;
