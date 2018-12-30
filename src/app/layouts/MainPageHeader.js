import Link from '../components/Link';
import events from '../services/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';
import getUserProfile from '../services/actions/parcel/getUserProfile';


const MainPageHeader = () => {
  stackRequests('getUserProfile', getUserProfile);
  events.on(subscriptions.FETCH_USER_PROFILE_SUCCESS, (data) => renderHeader(data));
  return renderHeader();
}

export const renderHeader = () => {
  let userProfileData = window.app.state['userProfileData'] || {};
  let { username } = userProfileData;
  
  username = username === undefined ? '' : `<span>Hi, </span>${username}`;

  let container = document.querySelector('.page-header-container');

  let headerHTML = `
    <div class="page-header row">
      <div id="toast-place-holder"></div>
      <div class="text">
        <div class="name">${username}</div>
      </div>
      <div class="icons">
        <span class="drop-down-container">
          <span class='icon-group'>
            <span class="fa fa-user"></span>
          </span>
          <div class="drop-down">
            <ul>
              <!-- <li><a href="#">Settings</a></li> -->
              <li>
                ${Link({
                  to:'/user-profile', 
                  text:`Profile`,
                })}
              </li>
              <li>
                ${Link({
                  to:'/logout', 
                  text:`Logout`, 
                })}
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div><!-- end of page-header -->
  `;

  
  if(container !== null) {
    container.innerHTML = headerHTML;
  }

  return `<div class='page-header-container'>
    <div class="page-header row">
      <div id="toast-place-holder"></div>
      <div class="text">
        <div class="name">${username}</div>
      </div>
      <div class="icons">
        <span class="drop-down-container">
          <span class='icon-group'>
            <span class="fa fa-user"></span>
          </span>
          <div class="drop-down">
            <ul>
              <!-- <li><a href="#">Settings</a></li> -->
              <li>
                ${Link({
                  to:'/user-profile', 
                  text:`Profile`,
                })}
              </li>
              <li>
                ${Link({
                  to:'/logout', 
                  text:`Logout`, 
                })}
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div></div><!-- end of page-header -->
  `;
}

export default MainPageHeader;
