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
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.id !== undefined).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should return message when record is not found for GET parcels/:id end point', (done) => {
    request.get('/api/v1/parcels/0')
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should cancel a specific parcel delivery order', (done) => {
    request.put('/api/v1/parcels/1/cancel')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('success');
        expect(res.body.data.status).to.equal('cancelled');
        done();
      });
  });
  it('should return message when record is not found for PUT parcels/:id/cancel end point', (done) => {
    request.put('/api/v1/parcels/0/cancel')
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should update a specific parcel delivery order', (done) => {
    request.put('/api/v1/parcels/1')
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
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('NotFound');
        done();
      });
  });
  it('should return records for seleted user', (done) => {
    request.get('/api/v1/users/2/parcels')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});
