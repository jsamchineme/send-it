import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test case for the "parcel" resource endpoints', () => {
  let authToken = '';
  before((done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'jaden@example.io',
        password: 'secret',
      })
      .expect(200)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it('should get all parcels', (done) => {
    request.get('/api/v1/parcels')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should create new parcel delivery order', (done) => {
    const parcelOrderData = {
      userId: 1,
      description: 'dummy value',
      deliveryLocation: 'dummy value',
      presentLocation: 'dummy value',
      pickupLocation: 'dummy value',
      presentMapPointer: 'dummy value',
    };
    request.post('/api/v1/parcels')
      .set('x-access-token', authToken)
      .send(parcelOrderData)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.id !== undefined).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should get a specific parcel delivery order', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.id !== undefined).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should return failure when request does not have JWT token', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('Failed');
        expect(res.body.message).to.equal('missing token');
        done();
      });
  });
  it('should return failure when request has wrong JWT token', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .set('x-access-token', 'xyz')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('Failed');
        expect(res.body.message).to.equal('Authentication failed. Token could be expired or invalid');
        done();
      });
  });
  it('should return message when record is not found for GET parcels/:id end point', (done) => {
    request.get('/api/v1/parcels/0')
      .set('x-access-token', authToken)
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should cancel a specific parcel delivery order', (done) => {
    request.put('/api/v1/parcels/1/cancel')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('success');
        expect(res.body.data.status).to.equal('cancelled');
        done();
      });
  });
  it('should return message when record is not found for PUT parcels/:id/cancel end point', (done) => {
    request.put('/api/v1/parcels/0/cancel')
      .set('x-access-token', authToken)
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should update a specific parcel delivery order', (done) => {
    request.put('/api/v1/parcels/1')
      .set('x-access-token', authToken)
      .send({ status: 'delivered' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('success');
        expect(res.body.data.status).to.equal('delivered');
        done();
      });
  });
  it('should return message when record is not found for PUT parcels/:id end point', (done) => {
    request.put('/api/v1/parcels/0')
      .set('x-access-token', authToken)
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should return records for seleted user', (done) => {
    request.get('/api/v1/users/2/parcels')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});
