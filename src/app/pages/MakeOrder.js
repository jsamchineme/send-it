import Link from '../components/Link';
import SideBar from '../layouts/SideBar'
import MobileHeader from '../layouts/MobileHeader';
import MainPageHeader from '../layouts/MainPageHeader';

export default class MakeOrder {
  constructor() {
    document.title = "Create Order - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
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
                    <section class="page-section single">
                      <div class="header">
                        <div class="order-info heading">
                          <!-- <span>Order ID <span class="inset-text">#182323</span></span> -->
                          <span>New Order </span>
                        </div>
                      </div>
      
                      <div class="single-view">
                        <div class="container">
                          <div class="body row">
                            <form class='' action="">
                              <div class="info-sections column col-7">
                                <div class="item">
                                  <div class="field">Pickup Location</div>
                                  <div class="value">
                                    <!-- Where do you want us to come pick up the parcel? -->
                                    <input class='line-input' type="text" id='destination' placeholder="Provide Pickup location" />
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Delivery Location</div>
                                  <div class="value">
                                    <!-- Where should the parcel be delivered? -->
                                    <input class='line-input' type="text" id='deliveryLocation' placeholder="Provide delivery location" />
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Parcel Description</div>
                                  <div class="value">
                                    <!-- Describe the parcel -->
                                    <textarea class='line-input' id='description' placeholder="Provide brief description"></textarea>
                                  </div>
                                </div>
      
                                <div class="item actions">
                                  <a href="#map-modal" class="btn bg-light-orange medium-btn">Save Order</a>
                                </div>
                              </div>
                              <div class="images column col-5">
                                <div class="image">
                                  <!-- <img src="assets/img/packages/package-1.png" alt=""> -->
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
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