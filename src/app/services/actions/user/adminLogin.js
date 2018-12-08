import * as api from '../../apiRequests';
import { persistAuthUser, retrieveAuthUser } from "../../localStorage";
import { computeMessage } from '../../../services/validation/serverErrorMessages';
import { showMessages } from '../../../services/validation/index';
import subscriptions from '../../../services/events/subscriptions';
import events from '../../../services/events';
import delay from '../../../services/utils/delay';

const adminLogin = async (e) => {
  e.preventDefault();
  const data = window.app.store.adminLoginData;
  const canProceed = window.app.store['adminLoginCanProceed'];
  const errorBox = document.getElementById('server-error-box');
  const actionBox = document.getElementById('adminLogin-action-button');

  if(canProceed) {
    events.emit(
      subscriptions.REQUEST_PENDING,
      {actionBox, action: 'adminLogin', normalText: 'Login'}
    );

    await delay(2000);

    try {
      const response = await api.userLogin(data);
      window.app.store.authUser = response.data;
      errorBox.innerHTML = '';

      const authUser = response.data;
    
      persistAuthUser(authUser);

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'adminLogin', normalText: 'Login'}
      );
      
      if(authUser.isAdmin) {
        window.location.href = '/admin-dashboard/all-parcels';
      } else {
        window.location.href = '/all-parcels';
      }
    }
    catch(error) {
      const message = computeMessage(error.message, error.status);
      showMessages(message, errorBox);

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'adminLogin', normalText: 'Login'}
      );
    }
  } else {
    const message = 'Complete the form as required';
    showMessages(message, errorBox);
  }

}

export default adminLogin;