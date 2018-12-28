import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';

const fetchAParcel = async (parcelId) => {
  const authUser = retrieveAuthUser();

  let data = { token: authUser.token, parcelId };

  try {
    const response = await api.fetchAParcel(data);
    
    // store the parcels data in the window.app.state namespace
    window.app.state['selectedParcel'] = response.data;

    events.emit(
      subscriptions.FETCH_PARCEL_SUCCESS,
      response.data
    );

  }
  catch(error) {
  }

}

export default fetchAParcel;