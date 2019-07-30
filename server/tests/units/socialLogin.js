import sinon from 'sinon';
import { assert } from 'chai';
import AuthController from '../../v1/controllers/AuthController';

describe('social login controller', () => {
  it('returns response with user login details', async () => {
    const req = {
      user: {
        id: 1,
        email: 'sample@te.com',
        isAdmin: false,
      },
    };

    const res = {
      redirect: sinon.spy(),
    };

    await AuthController.socialLogin(req, res);
    assert(res.redirect.calledOnce);
  });
});
