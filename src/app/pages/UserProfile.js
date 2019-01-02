import SideBar from '../layouts/SideBar'
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';
import PaginatedParcelList, { bindPageButtons } from '../containers/PaginatedParcelList';
import { getAllUserParcels } from '../services/actions/parcel';
import events from '../services/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';
import getUserProfile from '../services/actions/parcel/getUserProfile';

export default class UserProfile {
  constructor() {
    document.title = "All Orders - Send IT - Send Orders Anywhere | Timely Delivery | Real Time Tracking";
    stackRequests('getUserParcels', getAllUserParcels);
    stackRequests('getUserProfile', getUserProfile);
    
    events.on(subscriptions.FETCH_USER_PARCELS_SUCCESS, () => this.listOrders());
    events.on(subscriptions.PAGINATION_TARGET_SELECTED, (currentPage) => this.listOrders({ currentPage }));
    events.on(subscriptions.FETCH_USER_PROFILE_SUCCESS, (data) => this.renderProflie(data));
  }

  listOrders(props = {}) {
    let currentPage = props.currentPage || 1;
    let parcels = window.app.state['allUserParcels'] || []; 
    let parcelHTML = PaginatedParcelList({ numberPerPage: 8, parcels, currentPage });
    let target = document.getElementById('orders-list');
    target ? target.innerHTML = parcelHTML : null;
    bindPageButtons();
    return parcelHTML;
  }

  renderProflie() {
    let userProfileData = window.app.state['userProfileData'] || {};
    let { username, email, parcels = {} } = userProfileData;

    
    let summaryHTML = "";
    if(username !== undefined) {
      username = username === undefined ? "" : username;
      email = email === undefined ? "" : email;
  
      let numberDelivered = "";
      let numberCancelled = "";
      let numberPending = "";
  
      if(parcels.transiting !== undefined) {
        numberDelivered = parcels.delivered.count;
        numberCancelled = parcels.cancelled.count;
        numberPending = parcels.placed.count + parcels.transiting.count;
      }
  
      summaryHTML += `
        <div class="summary-card row no-avatar">
          <div class="left column col-8">
            <div class="image round">
              <img src="/assets/img/users/amilolo.jpg" alt="Profile Picture">
            </div>
            <div class="text-info">
              <div class="text-1">${username}</div>
              <div class="text-2">${email}</div>
            </div>
          </div>
          <div class="right column col-4">
            <div class="activity-summary">
              <div class="container">
                <span class="text-1 declined"><span class="num">${numberDelivered}</span>Delivered</span>
                <span class="text-2 pending"><span class="num">${numberPending}</span>Pending</span>
                <span class="text-3 pending"><span class="num">${numberCancelled}</span>Cancelled</span>
                <!-- <span class="text-2 pending"><span class="num">1</span>Pending</span> -->
              </div>
            </div>
          </div>
        </div>
      `;

      let summaryCardContainer = document.getElementById('summary-card-container');
      summaryCardContainer ? summaryCardContainer.innerHTML = summaryHTML : null;
    }

    return summaryHTML;
  }

  render() {
    return (`
      <div>
        <div class="wrapper">
          <section class="page-content">
            <!-- Mobile Header -->
            ${MobileHeader()}

            <div class="row">
              <div class="column col-3 page-left">
                <!-- page sidebar -->
                ${SideBar()}
              </div>
              
              <div class="column col-9 page-right">
                <!-- Main Page Header -->
                ${MainPageHeader()}
      
                <div class="main-content">
                  <div class="container">

                    <div id='summary-card-container'>
                      ${this.renderProflie()}
                    </div>

                    <section class="page-section items-list all-parcels">
                      <div class="header"><span>All Orders</span></div>

                      <div id="create-order-view"></div>

                      <div class="body row auto-container gutter-20" id="orders-list">
                        ${this.listOrders()}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      
        <div class="hide-for-large">
          <div class="" id="menu-active-overlay"></div>
        </div>
      </div>
    `);
  }
}