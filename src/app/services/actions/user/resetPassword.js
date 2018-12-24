import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import { computeMessage } from '../../../services/validation/serverErrorMessages';
import { showMessages } from '../../../services/validation/index';
import subscriptions from '../../../services/events/subscriptions';
import events from '../../../services/events';
import Toast from '../../../components/Toast';

const resetPassword = async (e) => {
  e.preventDefault();
  const data = window.app.store.resetPasswordData; 
  const canProceed = window.app.store['resetPasswordCanProceed'];
  const errorBox = document.getElementById('server-error-box');
  const actionBox = document.getElementById('resetPassword-action-button');

  if(canProceed) {
    events.emit(
      subscriptions.REQUEST_PENDING,
      {actionBox, action: 'resetPassword', normalText: 'Request Password Request'}
    );

    try {
      Toast.show({message: 'Request processing', type: 'error', hideAfter: 7000});

      const response = await api.requestPasswordReset(data);

      errorBox.innerHTML = '';
      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'resetPassword', normalText: 'Request Password Request'}
      );
      Toast.show({message: 'Request Sent', type: 'success', hideAfter: 8000});
    }
    catch(error) {
      const message = computeMessage(error.message, error.status);
      showMessages(message, errorBox);

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'resetPassword', normalText: 'Request Password Request'}
      );
      Toast.show({message, type: 'error'});
    }
  } else {
    const message = 'Complete the form as required';
    showMessages(message, errorBox);
    Toast.show({message, type: 'error', hideAfter: 7000});
  }

}

export default resetPassword;