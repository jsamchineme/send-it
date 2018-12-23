import SideBar from '../layouts/SideBar'
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';
import PaginatedParcelList, { bindPageButtons } from '../containers/PaginatedParcelList';
import { getAllUserParcels } from '../services/actions/parcel';
import events from '../services/events/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';

export default class DeliveredParcels {
  constructor() {
    document.title = "Delivered Parcels - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
    stackRequests('getUserParcels', getAllUserParcels);
    events.on(subscriptions.FETCH_USER_PARCELS_SUCCESS, () => this.listOrders());
    events.on(subscriptions.PAGINATION_TARGET_SELECTED, (currentPage) => this.listOrders({ currentPage }));
  }

  listOrders(props = {}) {
    let currentPage = props.currentPage || 1;
    let parcels = window.app.state['allUserParcels'] || [];
    parcels = parcels.filter(item => item.status === 'delivered');
    let parcelHTML = PaginatedParcelList({ numberPerPage: 4, parcels, currentPage });
    let target = document.getElementById('orders-list');
    target ? target.innerHTML = parcelHTML : null;
    bindPageButtons();
    return parcelHTML;
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

                    <section class="page-section items-list all-parcels">
                    <div class="header"><span>Parcels <strong>Delivered</strong></span></div>

                      <div class="body row auto-container gutter-20" id='orders-list'>
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