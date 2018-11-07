import { describe, it } from 'mocha';
import { expect } from 'chai';
import Model from '../../models/Model';

const allRecords = [
  { id: 1, name: 'Attribute Name', state: 'lagos' },
  { id: 2, name: 'Attribute Name', state: 'lagos' },
  { id: 3, name: 'Attribute Name', state: 'imo' },
];

const entityAttributes = ['id', 'name', 'state'];

const modelTests = () => {
  describe('Test Case for the Model Class', () => {
    const model = new Model(entityAttributes, allRecords);
    it('should Instantiate Model', () => {
      expect(model.allRecords.length).to.equal(allRecords.length);
    });
    describe('Model.findById()', () => {
      it('should return a record when valid id is supplied', () => {
        expect(model.findById(1).id).to.equal(1);
      });
      it('should return undefined when no id is supplied', () => {
        expect(model.findById()).to.equal(undefined);
      });
    });
    describe('Model.getAll()', () => {
      const allReturnedRecords = model.getAll();
      it('should return all records', () => {
        expect(model.allRecords.length).to.equal(allReturnedRecords.length);
      });
      it('should return selected records when where constraints are set', () => {
        const demoRecords = model.allRecords.filter(item => item.state === 'lagos');
        const records = model.where({ state: 'lagos' }).getAll();
        expect(records.length).to.equal(demoRecords.length);
      });
    });
    describe('Model.create()', () => {
      it('should create records when data is supplied', () => {
        const lastRecord = allRecords[allRecords.length - 1];
        const newRecordData = { name: 'New Name' };
        const result = model.create(newRecordData);
        expect(result.name).to.equal('New Name');
        expect(result.id).to.equal(lastRecord.id + 1);
      });
    });
    describe('Model.delete()', () => {
      it('should delete records when data is supplied', () => {
        const record = allRecords[0];
        expect(model.delete(record.id)).to.equal(true);
      });
      it('should return false when no parameter is supplied', () => {
        expect(model.delete()).to.equal(false);
      });
      it('should return false when no item is found to be deleted', () => {
        expect(model.delete(0)).to.equal(false);
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
      const record = model.allRecords[0];
      const result = model.findByAttribute('id', record.id);
      it('should return a record when valid attribute is supplied', () => {
        expect(result.id).to.equal(record.id);
      });
      it('should return undefined when no attribute is supplied', () => {
        expect(model.findByAttribute()).to.equal(undefined);
      });
    });
  });
};

export default modelTests;
