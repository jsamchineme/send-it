import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test case for the "parcel" resource endpoints', () => {
  let authToken = '';
  let adminToken = '';
  let authToken2 = '';
  let parcel = {};
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZGVuQGV4YW1wbGUuaW8iLCJ1c2VySWQiOjMsImlhdCI6MTU0MjIwNjYxOCwiZXhwIjoxNTQyMjEwMjE4fQ.rwoe1fad6KrQl7ewUL1QtT5YYkKaNsi5M1n70gjdy8k';
  before((done) => {
    // prepare client authToken
    request.post('/api/v1/auth/login')
      .send({
        email: 'jaden@example.io',
        password: 'secret',
      })
      .expect(200)
      .end((err, res) => {
        authToken = res.body.data.token;
      });
    // prepare client2 authToken for accessing unowned resource
    request.post('/api/v1/auth/login')
      .send({
        email: 'johndoe@example.io',
        password: 'secret',
      })
      .expect(200)
      .end((err, res) => {
        authToken2 = res.body.data.token;
      });
    // prepare admin authToken
    request.post('/api/v1/auth/login')
      .send({
        email: 'samcotech@example.io',
        password: 'secret',
      })
      .expect(200)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });

  it('should get all parcels', (done) => {
    request.get('/api/v1/parcels')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('should return invalid token when invalid token is used', (done) => {
    request.get('/api/v1/parcels')
      .set('x-access-token', invalidToken)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status).to.equal('Unauthenticated');
        done();
      });
  });
  it('should create new parcel delivery order', (done) => {
    const parcelOrderData = {
      description: 'dummy value',
      deliveryLocation: 'dummy value',
      presentLocation: 'dummy value',
      pickupLocation: 'dummy value',
      presentMapPointer: 'dummy value',
    };
    request.post('/api/v1/parcels')
      // .set('Content-Type', 'application/json')
      .set('x-access-token', authToken)
      .send(parcelOrderData)
      .expect(200)
      .end((err, res) => {
        parcel = res.body.data;
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('should get a specific parcel delivery parcel', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('should return failure when request does not have JWT token', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status).to.equal('Failed');
        done();
      });
  });
  it('should return failure when request has wrong JWT token', (done) => {
    const parcelId = 1;
    request.get(`/api/v1/parcels/${parcelId}`)
      .set('x-access-token', 'xyz')
      .expect(400)
      .end((err, res) => {
        expect(res.body.status).to.equal('Unauthenticated');
        expect(res.body.message).to.equal('Invalid or expired token');
        done();
      });
  });
  it('should return message when record is not found for GET parcels/:id end point', (done) => {
    request.get('/api/v1/parcels/0')
      .set('x-access-token', authToken)
      .expect(404)
      .end((err, res) => {
        expect(res.body.status).to.equal('NotFound');
        done();
      });
  });
  it('should cancel a specific parcel delivery parcel', (done) => {
    request.put('/api/v1/parcels/1/cancel')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.status).to.equal('cancelled');
        done();
      });
  });
  it('should return message when record is not found for PUT parcels/:id/cancel end point', (done) => {
    request.put('/api/v1/parcels/0/cancel')
      .set('x-access-token', authToken)
      .expect(404)
      .end((err, res) => {
        expect(res.body.status).to.equal('NotFound');
        done();
      });
  });
  it('should update a specific parcel delivery parcel', (done) => {
    request.put('/api/v1/parcels/1')
      .set('x-access-token', authToken)
      .send({ status: 'delivered' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.status).to.equal('delivered');
        done();
      });
  });
  it('should return message when record is not found for PUT parcels/:id end point', (done) => {
    request.put('/api/v1/parcels/0')
      .set('x-access-token', authToken)
      .expect(404)
      .end((err, res) => {
        expect(res.body.status).to.equal('NotFound');
        done();
      });
  });
  it('should return records for seleted user', (done) => {
    request.get('/api/v1/users/2/parcels')
      .set('x-access-token', authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.length > 0).to.equal(true);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  describe('Change parcel destinations', () => {
    it('should change parcel destination', (done) => {
      request.put(`/api/v1/parcels/${parcel.id}/destination`)
        .set('x-access-token', authToken)
        .send({ deliveryLocation: 'new location' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id).to.equal(parcel.id);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return unauthorised when wrong user attempts access', (done) => {
      request.put(`/api/v1/parcels/${parcel.id}/destination`)
        .set('x-access-token', authToken2)
        .send({ deliveryLocation: 'new location' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Unauthorised');
          expect(res.body.message).to.equal('You lack privileges to access resource');
          done();
        });
    });
  });
  describe('Change parcel status', () => {
    it('should change parcel status', (done) => {
      request.put(`/api/v1/parcels/${parcel.id}/status`)
        .set('x-access-token', adminToken)
        .send({ status: 'delivered' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.status).to.equal('delivered');
          done();
        });
    });
    it('should return unauthorised when non admin user attempts access', (done) => {
      request.put(`/api/v1/parcels/${parcel.id}/status`)
        .set('x-access-token', authToken)
        .send({ status: 'delivered' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Unauthorised');
          expect(res.body.message).to.equal('You lack privileges to access resource');
          done();
        });
    });
  });
});
