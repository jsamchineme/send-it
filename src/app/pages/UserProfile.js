import SideBar from '../layouts/SideBar'
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';
import PaginatedParcelList, { bindPageButtons } from '../containers/PaginatedParcelList';
import { getAllUserParcels } from '../services/actions/parcel';
import events from '../services/events/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';

export default class AllParcels {
  constructor() {
    document.title = "All Parcels - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
    stackRequests('getUserParcels', getAllUserParcels);
    events.on(subscriptions.FETCH_USER_PARCELS_SUCCESS, () => this.listOrders());
    events.on(subscriptions.PAGINATION_TARGET_SELECTED, (currentPage) => this.listOrders({ currentPage }));
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

  renderSummaryCard() {

  }

  renderCreateOrder() {
    let leadHTML = `
      <div class='create-order'>
        Create Order
      </div>
    `;
    let target = document.getElementById('create-order-view');
    target.innerHTML = leadHTML;
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

                    <div class="summary-card row no-avatar">
                      <div class="left column col-8">
                        <div class="image round">
                          <img src="/assets/img/users/amilolo.jpg" alt="Profile Picture">
                        </div>
                        <div class="text-info">
                          <div class="text-1">Solomonowen Jalamiaweyes</div>
                          <div class="text-2">solomonowenjalamiaweyes@gmail.com</div>
                          <div class="v-gap-1"></div>
                          <!-- <div class="text-3"><span class='inset-text'>joined</span> 24th Dec 2018</div> -->
                          <div>
                            <!-- <button class='btn small-btn'>Edit</button> -->
                          </div>
                        </div>
                      </div>
                      <div class="right column col-4">
                        <div class="activity-summary">
                          <div class="container">
                            <span class="text-1 declined"><span class="num">15</span>Delivered</span>
                            <span class="text-2 pending"><span class="num">1</span>In Transit</span>
                            <span class="text-3 pending"><span class="num">3</span>Cancelled</span>
                            <!-- <span class="text-2 pending"><span class="num">1</span>Pending</span> -->
                          </div>
                        </div>
                      </div>
                    </div>

                    <section class="page-section items-list all-parcels">
                      <div class="header"><span>All Parcels</span></div>

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