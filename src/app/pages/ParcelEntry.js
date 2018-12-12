import Link from '../components/Link';
import SideBar from '../layouts/SideBar'
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';
import Parcel from '../components/Parcel';
import { fetchParcel } from '../services/actions/parcel';
import events from '../services/events/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';

export default class ParcelEntry {
  constructor() {
    document.title = "All Parcels - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";

    let parcelId = window.app.state.selectedParcelId;

    stackRequests('fetchSingleParcel', fetchParcel.bind(this, parcelId));

    events.on(subscriptions.FETCH_PARCEL_SUCCESS, this.renderParcel);
  }

  renderParcel(parcel) {
    let {
      description, 
      status, 
      sentOn, 
      deliveredOn,
      cost,
      currentLocation,
      from,
      to,
      weight,
      weightmetric,
      presentMapPointer,
      id,
    } = parcel;

    let parcelHTML = `
      <section class="page-section single">
        <div class="header">
          <div class="order-info heading">
            <span>Order ID <span class="inset-text">#${id}</span></span>
          </div>
        </div>

        <div class="single-view">
          <div class="container">
            <div class="header">
              <span class='title'>${description}</span>
              <div class="stats-info">
                <div>
                  Created on <span class="inset-text">${sentOn}</span>
                </div>
                <div>
                  Status on <span class="inset-text">${status}</span>
                </div>
              </div>
            </div>
            <div class="body row">
              <div class="info-sections column col-7">
                <div class="item">
                  <div class="field">Present Location</div>
                  <div class="value">
                    ${currentLocation}
                  </div>
                  <div class="actions">
                    <a href="#map-modal" class="btn medium-btn bg-light-orange">View on the map</a>
                  </div>
                </div>
                <div class="item">
                  <div class="field">Delivery Location</div>
                  <div class="value">
                    ${to}
                  </div>
                </div>
                <div class="item">
                  <div class="field">Pickup Location</div>
                  <div class="value">
                    ${from}
                  </div>
                </div>
                <div class="item actions">
                  <button class="btn danger medium-btn">Cancel Order</button>
                  <a href="edit-order.html" class="btn medium-btn bg-light-orange">Edit Order</a>
                </div>
              </div>
              <div class="images column col-5">
                <div class="image">
                  <img src="/assets/img/packages/package-1.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    let target = document.getElementById('parcel-view');
    target.innerHTML = parcelHTML;
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
                  <div class="container" id="parcel-view">
                    <!-- parcel view -->
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