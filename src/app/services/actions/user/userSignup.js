import * as api from '../../apiRequests';
import { persistAuthUser, retrieveAuthUser } from "../../localStorage";
import { computeMessage } from '../../../services/validation/serverErrorMessages';
import { showMessages } from '../../../services/validation/index';
import subscriptions from '../../../services/events/subscriptions';
import events from '../../../services/events';
import delay from '../../../services/utils/delay';

const userSignup = async (e) => {
  e.preventDefault();
  const data = window.app.store.userSignupData;
  const canProceed = window.app.store['userSignupCanProceed'];
  const errorBox = document.getElementById('server-error-box');
  const actionBox = document.getElementById('userSignup-action-button');

  if(canProceed) { 
    events.emit(
      subscriptions.REQUEST_PENDING, 
      {actionBox, action: 'userSignup', normalText: 'Login'}
    );

    // await delay(2000);

    try {
      const response = await api.userSignup(data);
      window.app.store.authUser = response.data;
      errorBox.innerHTML = '';

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'userSignup', normalText: 'Login'}
      );
      
      window.app.funcs.changeRoute('/signup/welcome');
    }
    catch(error) {
      const message = computeMessage(error.message, error.status);
      showMessages(message, errorBox);

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'userSignup', normalText: 'Login'}
      );
    }
  } else {
    const message = 'Complete the form as required';
    showMessages(message, errorBox);
  }

}

export default userSignup;
