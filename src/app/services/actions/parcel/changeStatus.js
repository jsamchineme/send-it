import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';
import Toast from '../../../components/Toast';

const changeStatus = async (parcelId, status) => {
  const authUser = retrieveAuthUser();
  let token = authUser.token;
  let data = { status };

  try {
    Toast.show({ message: 'Request processing', autoHide: false, type: 'pending'});

    const response = await api.changeStatus(data, parcelId, token);
    
    // store the parcels data in the window.app.state namespace
    window.app.state['selectedParcel'] = response.data;

    events.emit(
      subscriptions.EDIT_PARCEL_ORDER_SUCCESS,
      response.data
    );

    Toast.show({ message: 'Request completed', type: 'success'});
  }
  catch(error) {
    Toast.show({ message: 'Request failed', type: 'error'});
  }
}

export default changeStatus;