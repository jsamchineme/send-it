import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test case for the "parcel" resource endpoints', () => {
  it('should get all parcels', (done) => {
    request.get('/api/v1/parcels')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});
