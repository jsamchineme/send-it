import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';

const fetchAParcel = async (parcelId) => {
  const authUser = retrieveAuthUser();

  let data = { token: authUser.token, parcelId };

  console.log('----DAta', data);

  try {
    const response = await api.fetchAParcel(data);

    console.log('Response-----', response);
    
    // store the parcels data in the window.app.state namespace
    window.app.state['selectedParcel'] = response.data;

    events.emit(
      subscriptions.FETCH_PARCEL_SUCCESS,
      response.data
    );

  }
  catch(error) {
    console.log('Error', error.status);
  }

}

export default fetchAParcel;