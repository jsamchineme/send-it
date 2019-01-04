import SideBar from '../../layouts/AdminSideBar';
import MobileHeader from '../../layouts/MobileHeader';
import MainPageHeader from '../../layouts/MainPageHeader';
import { 
  fetchParcel, 
  changeStatus, 
  editPresentLocation
} from '../../services/actions/parcel';
import events from '../../services/events';
import saveInput from '../../services/actions/saveInput';
import subscriptions from '../../services/events/subscriptions';
import stackRequests from '../../services/utils/stackRequests';
import confirmModalBox from '../../components/modals/confirmModal';
import Map from '../../services/Map';
import DateFormater from '../../services/DateFormater';
import parcelStatuses from '../../constants/parcelStatuses';

export default class ParcelEntry {
  constructor() {
    document.title = "All Orders - Send IT - Send Orders Anywhere | Timely Delivery | Real Time Tracking";

    let parcelId = window.app.state.selectedParcelId;

    stackRequests('fetchSingleParcel', fetchParcel.bind(this, parcelId));

    events.on(subscriptions.FETCH_PARCEL_SUCCESS, this.renderParcel);
    events.on(subscriptions.EDIT_PARCEL_ORDER_SUCCESS, this.renderParcel);
  }

  renderParcel() {
    let parcel = window.app.state['selectedParcel'];
    
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
        contactEmail,
        contactPhone,
      } = parcel;
  
      
      let mapViewButton = '';
      if(!window.mapReady) {
        mapViewButton = status !== 'cancelled' ? 
          `<button class="btn medium-btn bg-light-orange" id="map-load-btn">View on the map</button>`
          : '';
      }
      
      // allow editing destination only if status is neither 'cancelled' nor 'delivered'
      let statusChangeSelect = `<select class='status-change'>
        <option value='transiting' ${status === 'transiting' && 'selected'}>Transiting</option>
        <option value='placed' ${status === 'placed' && 'selected'}>Placed</option>
        <option value='cancelled' ${status === 'cancelled' && 'selected'}>Cancelled</option>
        <option value='delivered' ${status === 'delivered' && 'selected'}>Delivered</option>
      </select>`;
  
      let presentLocationSection = `<div id='currentLocation-error-box' class='error-box'></div>
          <input class='line-input' name='currentLocation' type="text" placeholder="type location here" value='${currentLocation}'/>
          <br>
          <button 
            class='btn small-btn save-edit' 
            id='editPresentLocation-action-button'
            data-parcel-id=${id}
          >Save</button>
        `
      
      let parcelStatus = parcelStatuses[status];
  
      sentOn = DateFormater.formatDate(sentOn);
  
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
                    Order <span class="inset-text">${parcelStatus}</span>
                  </div>
                </div>
              </div>
              <div class="body row">
                <div class="info-sections column col-5">
                  <div class="item">
                    <div class="field">Present Location</div>
                    <div class="value">
                      ${presentLocationSection}
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
                    <div class="field">Parcel Weight</div>
                    <div class="value">
                      ${weight}
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
                    <div class="input-group">
                      ${statusChangeSelect}
                    </div>
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
      target ? target.innerHTML = parcelHTML : null;
  
      if(window.mapReady) {
        Map.initMap(from, to);
      }
  
      let statusSelect = document.querySelector('.status-change');
      statusSelect ? statusSelect.addEventListener('change', (e) => changeStatus(id, e.target.value)) : null;
  
      let infoSection = document.querySelector('.info-sections');
      infoSection ? infoSection.addEventListener('input', (e) => saveInput('editPresentLocation', e)) : null;
      
      window.app.bindClassNames('save-edit', 'click', 
        (e) => {
          let parcelId = e.target.dataset.parcelId;
          confirmModalBox({ title: 'Save Edit', yesAction: () => editPresentLocation(parcelId),
          description: 'Do you wish to continue?',
        })
      });
  
      if(mapViewButton) {
        let mapBtn = document.querySelector('#map-load-btn');
        mapBtn ? mapBtn.addEventListener('click', (e) => Map.setup()) : null;
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