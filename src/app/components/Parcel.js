import Link from './Link';

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
}) => {

  let caption = description.slice(0, 30);
  let dotLink = `
    ${Link({
      to:`/all-parcels/${id}`, 
      text: '...',
      className: 'view-more'
    })}
  `;
  caption += dotLink;


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
              <span class='field'><span class='inset-text'>Delivery ${status}</span></span>
              <!-- <span class='value'>View Order</span> -->
            </div>
            <div class="item">
              <span class="field">Created on <span class='inset-text style-1'>${sentOn}</span></span>
            </div>
          </div>
          <div class="actions">
            ${Link({
              to:`/all-parcels/${id}`, 
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
