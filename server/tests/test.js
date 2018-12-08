import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

// import and run the units tests for the Model class
import './units/model';

const request = supertest(app);

describe('Test cases for the API landing routes', () => {
  it('should load the root route', (done) => {
    request.get('/')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Welcome to Send-IT',
        });
        done();
      });
  });
  it('should load the API home route', (done) => {
    request.get('/api/v1')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Send-IT API v1',
        });
        done();
      });
  });
  it('should return not found when any unspecified routes are caught', (done) => {
    request.get('/andela')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Route Not Found',
        });
        done();
      });
  });
});
