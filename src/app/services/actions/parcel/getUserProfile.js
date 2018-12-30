import * as api from '../../apiRequests';
import { retrieveAuthUser } from "../../localStorage";
import events from '../../events/';
import subscriptions from '../../events/subscriptions';

const getUserProfile = async () => {
  const authUser = retrieveAuthUser();

  let data = {
    token: authUser.token,
    userId: authUser.id
  };
  
  try {
    const response = await api.getUserProfile(data);
    
    window.app.state['userProfileData'] = response.data; 
    
    events.emit(
      subscriptions.FETCH_USER_PROFILE_SUCCESS,
      response.data
    );
  }
  catch(error) {
  }

}

export default getUserProfile;