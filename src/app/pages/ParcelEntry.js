import SideBar from '../layouts/SideBar';
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';
import { fetchParcel, cancelOrder } from '../services/actions/parcel';
import events from '../services/events';
import subscriptions from '../services/events/subscriptions';
import stackRequests from '../services/utils/stackRequests';
import confirmModalBox from '../components/modals/confirmModal';
import Link from '../components/Link';
import Map from '../services/Map';
import DateFormater from '../services/DateFormater';
import parcelStatuses from '../constants/parcelStatuses';

export default class ParcelEntry {
  constructor() {
    document.title = "All Orders - Send IT - Send Orders Anywhere | Timely Delivery | Real Time Tracking";

    let parcelId = window.app.state.selectedParcelId;

    stackRequests('fetchSingleParcel', fetchParcel.bind(this, parcelId));

    events.on(subscriptions.FETCH_PARCEL_SUCCESS, this.renderParcel);
    events.on(subscriptions.CANCEL_PARCEL_ORDER_SUCCESS, this.renderParcel);
    events.on(subscriptions.MAP_SCRIPT_READY, this.renderParcel);
  }

  renderParcel(parcel) {
    if (window.app.state['selectedParcel'] !== undefined 
      && window.app.state['selectedParcel'] !== null) {
      parcel = window.app.state['selectedParcel'];
    }

    let parcelHTML = 'Loading Data...';
    if(parcel) {
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
        contactEmail = '',
        contactPhone = ''
      } = parcel;
  
      
      let mapViewButton = '';
      if(!window.mapReady) {
        mapViewButton = status !== 'cancelled' ? 
          `<button class="btn medium-btn bg-light-orange" id="map-load-btn">View on the map</button>`
          : '';
      }
      
      // allow order cancelling only if status is neither 'cancelled' nor 'delivered'
      let cancelOrderButton = status !== 'cancelled' && status !== 'delivered' ? 
        `<button class="btn danger medium-btn cancel-order" data-parcel-id='${id}'>Cancel Order</button>`
        : '';
      
      // allow editing destination only if status is neither 'cancelled' nor 'delivered'
      let editOrderButton = status !== 'cancelled' && status !== 'delivered' ? 
          `${Link({
              to:`/orders/edit/${id}`, 
              text:`Edit Order`,
              className: 'btn medium-btn bg-light-orange'
            })}
          `
        : '';
      
      let parcelStatus = parcelStatuses[status];
      sentOn = DateFormater.formatDate(sentOn);
      contactEmail = contactEmail === null || contactEmail === undefined ? 'Not Provided' : contactEmail;
      contactPhone = contactPhone === null || contactPhone === undefined ? 'Not Provided' : contactPhone;

      parcelHTML = `
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
                    Status on <span class="inset-text">${parcelStatus}</span>
                  </div>
                </div>
              </div>
              <div class="body row">
                <div class="info-sections column col-5">
                  <div class="item">
                    <div class="field">Present Location</div>
                    <div class="value">
                      ${currentLocation}
                    </div>
                    <div class="actions">
                      ${mapViewButton}
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
                  <div class="item">
                    <div class="field">Delivery Charge</div>
                    <div class="value">
                      ${cost}
                    </div>
                  </div>
                  <div class="item">
                    <div class="field">Receiver's Email</div>
                    <div class="value">
                      ${contactEmail}
                    </div>
                  </div>
                  <div class="item">
                    <div class="field">Receiver's Phone</div>
                    <div class="value">
                      ${contactPhone}
                    </div>
                  </div>
                  <div class="item actions">
                    ${cancelOrderButton}
                    ${editOrderButton}
                  </div>
                </div>
                <div class="map-view column col-7">
                  <div class='info-sections'>
                    <div class="item" id="output"></div>
                  </div>
                  <div id="map"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

      let target = document.getElementById('parcel-view');
      target.innerHTML = parcelHTML;

      if(window.mapReady) {
        Map.initMap(from, to);
      }
  
      window.app.bindClassNames('cancel-order', 'click', 
        (e) => {
          let parcelId = e.target.dataset.parcelId;
          confirmModalBox({ title: 'Cancel Order', yesAction: () => cancelOrder(parcelId),
          description: 'This action cannot be undone. Do you wish to continue?',
        })
      });

      if(mapViewButton) {
        document
          .querySelector('#map-load-btn')
          .addEventListener('click', (e) => Map.setup());
      }
    }

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
                  <div class="container" id="parcel-view">
                    ${this.renderParcel()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id='modal-window' class='modal-view'></div>
      
        <div class="hide-for-large">
          <div class="" id="menu-active-overlay"></div>
        </div>
      </div>
    `);
  }
}