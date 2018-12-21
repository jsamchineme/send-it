import {
  describe, it, before,
} from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Test User Endpoints', () => {
  let userToken;
  let user;
  describe('Get user profile', () => {
    before((done) => {
      // prepare user
      request.post('/api/v1/auth/login')
        .send({
          email: 'jsamchineme@gmail.com',
          password: 'secretpass',
        })
        .expect(201)
        .end((err, res) => {
          userToken = res.body.data.token;
          user = res.body.data;
          done();
        });
    });
    it('should return user profile', (done) => {
      request.get(`/api/v1/users/${user.id}`)
        .set('x-access-token', userToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.id !== undefined).to.equal(true);
          expect(res.body.data.parcels !== undefined).to.equal(true);
          if (err) return done(err);
          done();
        });
    });
  });
});
