import Parcel from '../components/Parcel';
import events from '../services/events';
import subscriptions from '../services/events/subscriptions';


const PaginatedParcelList = ({ numberPerPage, startPage = 1, parcels = [] }) => {
  // set 4 as the default number per page
  numberPerPage = numberPerPage !== undefined ? numberPerPage : 4;
  // set 4 as the default number per page
  // startPage = startPage !== undefined ? startPage : 0;

  let pageParcels = getPageParcels(parcels, startPage, numberPerPage);

  // logParcels(pageParcels);

  let parcelHTML = getViewHTML(pageParcels);

  parcelHTML += paginationNav(numberPerPage, parcels, startPage);

  return parcelHTML;
}

const logParcels = (parcels) => {
  parcels.forEach(i => console.log(i.id));
}

const getPageParcels = (parcels, startPage, numberPerPage) => {
  let pageParcels = [];
  // since startPage starts from 1, we normalise it to reduce by 1 due to array structure
  startPage--; 

  let startPoint = startPage * numberPerPage;
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

const getViewHTML = (parcels) => {
  let eachHTML = '';
  parcels.forEach(parcel => {
    eachHTML += Parcel(parcel);
  });
  return eachHTML;
}

const paginationNav = (numberPerPage, list, startPage) => {
  let pageNums = Math.ceil(list.length / numberPerPage);
  let pageTargetHTML = '<div class="item column col-12">';
  // prepare the page target buttons
  if(pageNums > 1) {
    for(let serial = 1; serial <= pageNums; serial++) {
      let activeStatus = '';
      if (Number(startPage) === serial) { 
        activeStatus = ' active';
      }
      pageTargetHTML += `<button class='paginated-view-btn ${activeStatus}' data-start-page=${serial}>${serial}</button>`;
    };
  }
  pageTargetHTML += "</div>"; // end of column

  return pageTargetHTML;
}

const handleButtonClick = (e) => {
  let { startPage } = e.target.dataset;
  window.app.state['AllParcelActivePage'] = startPage;
  events.emit(subscriptions.PAGINATION_TARGET_SELECTED, startPage);
}

export const bindPageButtons = () => {
  window.app.bindClassNames('paginated-view-btn', 'click', handleButtonClick);
}


export default PaginatedParcelList;