import passport from 'passport';
import passportFacebook from 'passport-facebook';
import 'dotenv';
import bcrypt from 'bcryptjs';
import UserModel from '../../../models/User';

const User = new UserModel();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL
} = process.env;

export const handleFacebookAuth = async (accessToken, refreshToken, profile, done) => {
  const { id } = profile;
  let user = await User.findByAttribute('username', id);
  if (!user) {
    const userData = {
      username: id,
      email: '',
      isAdmin: false,
      verified: false,
      password: bcrypt.hashSync(accessToken, 10),
    };
    user = await User.create(userData);
  }
  done(null, profile);
};

const FacebookStrategy = new passportFacebook.Strategy(
  {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'name'],
    enableProof: true,
  },
  handleFacebookAuth
);

passport.use(FacebookStrategy);

export default passport;
