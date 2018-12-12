import * as api from '../../apiRequests';
import { persistAuthUser, retrieveAuthUser } from "../../localStorage";


/**
 * This will refresh the authentication token 
 * using the last registered authentication data.
 * It will also instantiate a set interval to 
 * attempt a refresh after a couple of minutes.
 * Currently set to 10 minutes
 */
class TokenRefresh {
  /**
   * This will refresh the authentication token 
   * using the last registered authentication data.
   * It will also instantiate a set interval to 
   * attempt a refresh after a couple of minutes.
   * Currently set to 10 minutes
   * 
   * @async
   * @returns {void}
   */
  static async refreshToken() {
    const oldAuthData = retrieveAuthUser() || {};
    
    try {
      const response = await api.refreshToken(oldAuthData);
      const newAuthData = response.data;
  
      persistAuthUser(newAuthData);
    }
    catch(error) {
      if(oldAuthData.isAdmin) {
        window.app.funcs.changeRoute('/admin-login');
      } else {
        window.app.funcs.changeRoute('/login');
      }
    }

    TokenRefresh.refreshOverInterval();
  }

  /**
   * This will instantiate a set interval to 
   * attempt a refresh after a couple of minutes.
   * Currently set to 10 minutes
   * 
   * @async
   * @returns {void}
   */
  static refreshOverInterval() {
    // refresh token every 10 minutes
    const refreshInterval = 60 * 1000 * 10;
    clearInterval(TokenRefresh.setRefreshInterval);
  
    TokenRefresh.setRefreshInterval = setInterval(async () => {
      let oldAuthData = retrieveAuthUser() || {};
      try {
        const response = await api.refreshToken(oldAuthData);
        window.app.store.authUser = response.data;
        persistAuthUser(response.data);
      }
      catch(error) {
        // console.log('Failed to refresh token', error.message);
      }
    }, refreshInterval);
  }


}


export default TokenRefresh.refreshToken;