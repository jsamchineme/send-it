import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';

const getAllParcels = async () => {
  const authUser = retrieveAuthUser();

  try {
    const response = await api.getParcels(authUser);
    
    // store the parcels data in the window.app.state namespace
    window.app.state['allParcels'] = response.data;

    events.emit(
      subscriptions.FETCH_PARCELS_SUCCESS,
      response.data
    );

  }
  catch(error) {
  }

}

export default getAllParcels;