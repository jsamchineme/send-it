import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/events';
import subscriptions from '../../events/subscriptions';

const getAllUserParcels = async () => {
  const authUser = retrieveAuthUser();

  let data = {
    token: authUser.token,
    userId: authUser.id
  };
  
  try {
    const response = await api.getUserParcels(data);

    // store the parcels data in the window.app.state namespace
    window.app.state['allUserParcels'] = response.data;

    events.emit(
      subscriptions.FETCH_USER_PARCELS_SUCCESS,
      response.data
    );

  }
  catch(error) {
    console.log('Error', error);
  }

}

export default getAllUserParcels;