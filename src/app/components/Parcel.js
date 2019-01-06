import Link from './Link';
import DateFormater from '../services/DateFormater';
import parcelStatuses from '../constants/parcelStatuses';

const Parcel = ({
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
  scope
}) => {


  let caption = description !== undefined && description !== null ? description.slice(0, 30) : 'No description';
  let productLink = scope === 'admin' ? `/admin-dashboard/orders/${id}` : `/orders/${id}`;
  let dotLink = `
    ${Link({
      to: productLink, 
      text: '...',
      className: 'view-more'
    })}
  `;
  caption += dotLink;

  let parcelStatus = parcelStatuses[status];

  return (`
    <div class="item column col-3">
      <div class="container">
        <div class="upper-section">
          <div class="description">
            <span>${caption}</span>
            <!--<div class='text-num order-id'>Tracking ID: <span>#${id}</span></div>-->
          </div>
          <!-- <div class="image">
            <img src="/assets/img/packages/package-1.png" alt="">
          </div> -->
        </div>
        <div class="lower-section">
          <div class="quick-info">
            <div class="item">
              <span class='field'>Order<span class='inset-text'> ${parcelStatus}</span></span>
              <!-- <span class='value'>View Order</span> -->
            </div>
            <div class="item">
              <span class="field">Created on <span class='inset-text style-1'>${DateFormater.formatDate(sentOn)}</span></span>
            </div>
          </div>
          <div class="actions">
            ${Link({
              to: productLink, 
              text: 'View Order',
              className: 'btn medium-btn'
            })}
          </div>
        </div>
      </div>
    </div>
  `);
}

export default Parcel;
