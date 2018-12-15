import * as localStorage from './localStorage';
import saveInput from './actions/saveInput';
import { 
  userLogin, 
  userSignup, 
  adminLogin,
  refreshToken
} from './actions/user/index';
import { getAllParcels, cancelOrder, createOrder } from './actions/parcel/index';


export default {
  localStorage,
  actions: {
    saveInput,
    userLogin,
    adminLogin,
    userSignup,
    getAllParcels,
    refreshToken,
    cancelOrder,
    createOrder
  }
};