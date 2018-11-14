import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test case for the "auth" resource endpoints', () => {
  it('should process signup', (done) => {
    const newUserData = {
      username: 'samcotech2',
      email: 'samcotech2@example.io',
      password: 'secret',
    };
    request.post('/api/v1/auth/signup')
      .send(newUserData)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.id !== undefined).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should process login', (done) => {
    const newUserData = {
      email: 'jaden@example.io',
      password: 'secret',
    };
    request.post('/api/v1/auth/login')
      .send(newUserData)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.id !== undefined).to.equal(true);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should return unauthorised when wrong login credentials are supplied', (done) => {
    const newUserData = {
      email: 'jaden@example.ioo',
      password: 'secret',
    };
    request.post('/api/v1/auth/login')
      .send(newUserData)
      .expect(401)
      .end((err, res) => {
        expect(res.body.status).to.equal('Unauthorised');
        expect(res.body.message).to.equal('Provide valid credentials');
        done();
      });
  });
});
