import { describe, it } from 'mocha';
import { expect } from 'chai';
import Model from '../Model';

const allRecords = [
  { id: 1, name: 'Attribute Name' },
  { id: 2, name: 'Attribute Name' },
];

const entityAttributes = ['id', 'name'];

describe('Test Case for the Model Class', () => {
  const model = new Model(entityAttributes, allRecords);
  it('Should Instantiate Model', () => {
    expect(model.allRecords.length).to.equal(allRecords.length);
  });
  describe('Test cases for Model.findById', () => {
    it('should return a record when valid id is supplied', () => {
      expect(model.findById(1).id).to.equal(1);
    });
    it('should return undefined when no id is supplied', () => {
      expect(model.findById()).to.equal(undefined);
    });
  });
});
