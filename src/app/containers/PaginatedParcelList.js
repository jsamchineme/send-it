import Parcel from '../components/Parcel';
import events from '../services/events';
import subscriptions from '../services/events/subscriptions';
import Link from '../components/Link';


const PaginatedParcelList = ({ numberPerPage, currentPage = 1, parcels = [], scope }) => {
  // set 4 as the default number per page
  numberPerPage = numberPerPage !== undefined ? numberPerPage : 4;
  numberPerPage = 8;
  // set 4 as the default number per page
  // currentPage = currentPage !== undefined ? currentPage : 0;

  let pageParcels = getPageParcels(parcels, currentPage, numberPerPage);

  let parcelHTML = getViewHTML(pageParcels, scope);

  parcelHTML += paginationNav(numberPerPage, parcels, currentPage);

  return parcelHTML;
}

const getPageParcels = (parcels, currentPage, numberPerPage) => {
  let pageParcels = [];
  // since currentPage starts from 1, we normalise it to reduce by 1 due to array structure
  currentPage--; 

  let startPoint = currentPage * numberPerPage;
  for(let i = startPoint; i < (startPoint + numberPerPage); i++) {
    if(i - startPoint >= numberPerPage) 
      break; // stop when fetched items are up to the number per page
    
    let parcel = parcels[i];
    if(parcel) {
      pageParcels.push(parcel);
    }
  }
  return pageParcels;
}

const getViewHTML = (parcels, scope) => {
  let eachHTML = '';
  if(parcels.length > 0) {
    parcels.forEach(parcel => {
      parcel.scope = scope;
      eachHTML += Parcel(parcel);
    });
  } else {
    // prepare html prompting user to create new order
    eachHTML += `
      <div class="item column col-3">
        <div class="container">
          <div class="upper-section">
            <div class="description">
              <span>No record found</span>
            </div>
          </div>
          <div class="lower-section">
            <div class="quick-info">
              <div class="item">
              </div>
              <div class="item">
              </div>
            </div>
            <div class="actions">
              ${Link({
                to: '/make-order', 
                text: 'Create New Order',
                className: 'btn medium-btn'
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  }
  return eachHTML;
}

const paginationNav = (numberPerPage, list, currentPage) => {
  let pageNums = Math.ceil(list.length / numberPerPage);
  let pageTargetHTML = '<div class="item column col-12">';
  // prepare the page target buttons
  if(pageNums > 1) {
    for(let serial = 1; serial <= pageNums; serial++) {
      let activeStatus = '';
      if (Number(currentPage) === serial) { 
        activeStatus = ' active';
      }
      pageTargetHTML += `<button class='paginated-view-btn ${activeStatus}' data-current-page=${serial}>${serial}</button>`;
    };
  }
  pageTargetHTML += "</div>"; // end of column

  return pageTargetHTML;
}

const handleButtonClick = (e) => {
  let { currentPage } = e.target.dataset;
  window.app.state['AllParcelActivePage'] = currentPage;
  events.emit(subscriptions.PAGINATION_TARGET_SELECTED, currentPage);
}

export const bindPageButtons = () => {
  window.app.bindClassNames('paginated-view-btn', 'click', handleButtonClick);
}


export default PaginatedParcelList;