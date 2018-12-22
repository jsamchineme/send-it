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
          password: 'secretpass',
        })
        .expect(201)
        .end((err, res) => {
          adminToken = res.body.data.token;
          done();
        });
    });
    it('should process signup', (done) => {
      const newUserData = {
        username: 'newusername134',
        email: 'newemail134@example.io',
        password: 'secretpass',
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(201)
        .end((err, res) => {
          newUser = res.body.data;
          expect(res.body.data.id !== undefined).to.equal(true);

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
        .end(() => {
          done();
        });
    });
    it('should return error message when email already exists', (done) => {
      const newUserData = {
        email: 'jaden@example.io',
        username: 'jadenuser',
        password: 'secretpass'
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal('email already exists');
          done();
        });
    });
    it('should return error message when username already exists', (done) => {
      const newUserData = {
        email: 'jaden24@example.io',
        username: 'jadenuser',
        password: 'secretpass'
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal('username already exists');
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
    newUser = {};
    before((done) => {
      const newUserData = {
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'secretpass',
      };
      request.post('/api/v1/auth/signup')
        .send(newUserData)
        .expect(201)
        .end((err, res) => {
          newUser = res.body.data;
          expect(newUser.email).to.equal(newUserData.email);
          done();
        });
    });
    it('should be able to login', (done) => {
      const newUserData = {
        email: newUser.email,
        password: 'secretpass',
      };
      request.post('/api/v1/auth/login')
        .send(newUserData)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id !== undefined).to.equal(true);
          if (err) return done(err);
          done();
        });
    });
    it('should return error message on missing LOGIN input', (done) => {
      const newUserData = {
        email: 'jaden@example.io',
      };
      request.post('/api/v1/auth/login')
        .send(newUserData)
        .expect(422)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should return unauthorised when wrong login credentials are supplied', (done) => {
      const newUserData = {
        email: 'jaden@example.io',
        password: 'sssasasadadsads',
      };
      request.post('/api/v1/auth/login')
        .send(newUserData)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Provide correct login credentials');
          if (err) return done(err);
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
  describe('Password Reset', () => {
    const data = {
      email: 'jsamchineme@gmail.com',
      scope: 'testing',
    };
    it('should be able to request password change', (done) => {
      request.post('/api/v1/auth/reset')
        .send(data)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.message === 'mail has been sent').to.equal(true);
          expect(res.body.data.resetToken !== undefined).to.equal(true);
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Password Change', () => {
    let passwordResetToken;
    let userData;
    before((done) => {
      userData = {
        email: 'jsamchineme@gmail.com',
        scope: 'testing',
      };
      request.post('/api/v1/auth/reset')
        .send(userData)
        .expect(200)
        .end((err, res) => {
          passwordResetToken = res.body.data.resetToken;
          done();
        });
    });
    it('should be able to change password', (done) => {
      request.put('/api/v1/auth/reset')
        .send({
          email: userData.email,
          token: passwordResetToken,
          password: 'secretpass'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id !== undefined).to.equal(true);
          if (err) return done(err);
          done();
        });
    });
    after((done) => {
      // change the password back to the initial
      request.put('/api/v1/auth/reset')
        .send({
          email: userData.email,
          token: passwordResetToken,
          password: 'secretpass'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id !== undefined).to.equal(true);
          if (err) return done(err);
          done();
        });
    });
  });
});
