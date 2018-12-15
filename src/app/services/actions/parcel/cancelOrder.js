import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';
import Toast from '../../../components/Toast';

const cancelOrder = async (parcelId) => {
  const authUser = retrieveAuthUser();

  let data = { token: authUser.token, parcelId };

  Toast.show({ message: 'Request processing', autoHide: false, type: 'pending'});

  try {
    const response = await api.cancelOrder(data);
    
    // store the parcels data in the window.app.state namespace
    window.app.state['selectedParcel'] = response.data;

    events.emit(
      subscriptions.CANCEL_PARCEL_ORDER_SUCCESS,
      response.data
    );

    Toast.show({ message: 'Request completed', type: 'success'});
  }
  catch(error) {
    Toast.show({ message: 'Request failed', autoHide: false, type: 'error'});
  }

}

export default cancelOrder;