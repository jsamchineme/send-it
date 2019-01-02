import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import { computeMessage } from '../../validation/serverErrorMessages';
import { showMessages } from '../../validation/index';
import subscriptions from '../../events/subscriptions';
import events from '../../events';
import Toast from '../../../components/Toast';
import delay from '../../utils/delay';

const createOrder = async (e) => {
  e.preventDefault();
  const data = window.app.store.createOrderData;
  const canProceed = window.app.store['createOrderCanProceed'];
  const errorBox = document.getElementById('server-error-box');
  const actionBox = document.getElementById('createOrder-action-button');

  if(canProceed) { 
    events.emit(
      subscriptions.REQUEST_PENDING,
      {actionBox, action: 'createOrder', normalText: 'Create Order'}
    );

    Toast.show({ message: 'Request processing', autoHide: false, type: 'warning'});

    const authUser = retrieveAuthUser();

    try {
      const response = await api.createOrder(data, authUser.token);
      errorBox.innerHTML = '';

      events.emit(
        subscriptions.REQUEST_DONE, 
        {actionBox, action: 'createOrder', normalText: 'Create Order'}
      );
      Toast.show({message: 'The Parcel has been created', type: 'success'});

      await delay(2000);

      window.app.funcs.changeRoute(`/orders/${response.data.id}`);
    }
    catch(error) {
      const message = computeMessage(error.message, error.status);
      showMessages(message, errorBox);
      Toast.show({ message });

      events.emit(
        subscriptions.REQUEST_DONE,
        {actionBox, action: 'createOrder', normalText: 'Create Order'}
      );
    }
  } else {
    const message = 'Complete the form as required';
    showMessages(message, errorBox);
    Toast.show({ message });
  }

}

export default createOrder;
