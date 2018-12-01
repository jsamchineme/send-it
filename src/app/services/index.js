import * as localStorage from './localStorage';
import saveInput from './actions/saveInput';
import { userLogin, userSignup } from './actions/user';


export default {
  localStorage,
  actions: {
    saveInput,
    userLogin,
    userSignup
  }
};