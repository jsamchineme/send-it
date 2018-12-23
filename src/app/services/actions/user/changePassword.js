import * as api from '../../apiRequests';
import { persistAuthUser, retrieveAuthUser } from "../../localStorage";
import { computeMessage } from '../../../services/validation/serverErrorMessages';
import { showMessages } from '../../../services/validation/index';
import subscriptions from '../../../services/events/subscriptions';
import events from '../../../services/events';
import Toast from '../../../components/Toast';

const changePassword = async (e) => {
  e.preventDefault();
  const data = window.app.store.changePasswordData;
  data.email = window.app.state.userEmail; 
  let token = window.app.state.resetToken;
  const canProceed = window.app.store['changePasswordCanProceed'];
  const errorBox = document.getElementById('server-error-box');
  const actionBox = document.getElementById('changePassword-action-button');

  if(canProceed) {
    events.emit(
      subscriptions.REQUEST_PENDING,
      {actionBox, action: 'changePassword', normalText: 'Change Password'}
    );

    try {
      Toast.show({message: 'Password update in progress', type: 'error'});

      const response = await api.changePassword(data, token);

      errorBox.innerHTML = '';
      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'changePassword', normalText: 'Change Password'}
      );
      Toast.show({message: 'Password has been changed successfully', type: 'success'});
    }
    catch(error) {
      const message = computeMessage(error.message, error.status);
      showMessages(message, errorBox);

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'changePassword', normalText: 'Change Password'}
      );
      Toast.show({message, type: 'error'});
    }
  } else {
    const message = 'Complete the form as required';
    showMessages(message, errorBox);
    Toast.show({message, type: 'error'});
  }

}

export default changePassword;