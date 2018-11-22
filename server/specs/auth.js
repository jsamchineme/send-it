import {
  describe, it, before, after,
} from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import app from '../app';

const request = supertest(app);

describe('Test case for the "auth" resource endpoints', () => {
  let adminToken;
  let newUser;
  describe('User Signup', () => {
    before((done) => {
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
    it('should process signup', (done) => {
      const newUserData = {
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'secret',
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(200)
        .end((err, res) => {
          newUser = res.body.data;
          expect(res.body.data.id !== undefined).to.equal(true);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return error message on missing SIGNUP input', (done) => {
      const newUserData = {
        email: 'jaden2@example.io',
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(422)
        .end((err, res) => {
          expect(res.body.status).to.equal('Unprocessable Entity');
          done();
        });
    });
    after((done) => {
      // prepare admin authToken
      request.delete(`/api/v1/auth/users/${newUser.id}`)
        .set('x-access-token', adminToken)
        .expect(200)
        .end(() => {
          done();
        });
    });
  });
  describe('User Login', () => {
    let newUser = {};
    before((done) => {
      const newUserData = {
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'secret',
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(200)
        .end((err, res) => {
          newUser = res.body.data;
          expect(newUser.email).to.equal(newUserData.email);
          done();
        });
    });
    it('should be able to login', (done) => {
      const newUserData = {
        email: newUser.email,
        password: 'secret',
      };
      request.post('/api/v1/auth/login')
        .send(newUserData)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id !== undefined).to.equal(true);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
  it('should return error message on missing LOGIN input', (done) => {
    const newUserData = {
      email: 'jaden@example.io',
    };
    request.post('/api/v1/auth/login')
      .send(newUserData)
      .expect(422)
      .end((err, res) => {
        expect(res.body.status).to.equal('Unprocessable Entity');
        done();
      });
  });
  it('should return unauthorised when wrong login credentials are supplied', (done) => {
    let newUserData = {
      email: 'jaden@example.ioo',
      password: 'secret',
    };
    request.post('/api/v1/auth/login')
      .send(newUserData)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status).to.equal('Wrong Credentials');
        expect(res.body.message).to.equal('Provide correct login credentials');
      });
    newUserData = {
      email: 'jaden@example.io',
      password: 'sssasas',
    };
    request.post('/api/v1/auth/login')
      .send(newUserData)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status).to.equal('Wrong Credentials');
        expect(res.body.message).to.equal('Provide correct login credentials');
        done();
      });
  });
});
