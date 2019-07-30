import { expect, assert } from 'chai';
// import bcrypt from 'bcryptjs';
import sinon from 'sinon';
import { handleFacebookAuth } from '../../v1/helpers/services/Passport';
import { authProfileData } from './mocks/authProfileData';

const testPassportAuthentication = () => {
  describe('Passport Authentication Callbacks', () => {
    it('handle facebook authentication callback', async () => {
      const doneCallback = sinon.spy();
      const accessToken = 'xxx';
      const refreshToken = 'xxx';
      await handleFacebookAuth(accessToken, refreshToken, authProfileData, doneCallback);

      assert(doneCallback.calledOnce);
      expect(doneCallback.getCall(0).args[1]).deep.equal(authProfileData);
    });
  });
};

testPassportAuthentication();
