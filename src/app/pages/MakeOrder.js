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
                            <form 
                              class='create-order-form' 
                              action=""
                            >
                            <div class="info-sections column col-7">
                                <div class="item">
                                  <div id='server-error-box' class='error-box'></div>
                                </div>
                                <div class="item">
                                  <div class="field">Pickup Location</div>
                                  <div id='from-error-box' class='error-box'></div>
                                  <div class="value">
                                    <!-- Where do you want us to come pick up the parcel? -->
                                    <input 
                                      class='line-input' 
                                      type="text" 
                                      name='from'
                                      value="5 Victoria Land Street, Ikeja"
                                      placeholder="Provide Pickup location"
                                    />
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Delivery Location</div>
                                  <div id='to-error-box' class='error-box'></div>
                                  <div class="value">
                                    <!-- Where should the parcel be delivered? -->
                                    <input 
                                      class='line-input' 
                                      type="text" 
                                      name='to'
                                      value="5 Victoria Land Street, Ikeja"
                                      placeholder="Provide delivery location" 
                                    />
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Present Location</div>
                                  <div id='currentLocation-error-box' class='error-box'></div>
                                  <div class="value">
                                    <!-- Where should the parcel be delivered? -->
                                    <input 
                                      class='line-input' 
                                      type="text" 
                                      name='currentLocation'
                                      value="5 Victoria Land Street, Ikeja"
                                      placeholder="Provide your present location" 
                                    />
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Parcel Description</div>
                                  <div id='description-error-box' class='error-box'></div>
                                  <div class="value">
                                    <!-- Describe the parcel -->
                                    <textarea
                                      class='line-input' 
                                      name='description'
                                      placeholder="Provide brief description"
                                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eum quia numquam doloremque placeat dignissimos aperiam distinctio necessitatibus provident, deserunt dolorem soluta sit voluptas</textarea>
                                  </div>
                                </div>
                                <div class="item">
                                  <div class="field">Approximate weight of the parcel</div>
                                  <div id='weight-error-box' class='error-box'></div>
                                  <div class="value">
                                    <!-- Where should the parcel be delivered? -->
                                    <input 
                                      class='line-input' 
                                      type="text" 
                                      name='weight'
                                      value=25
                                      placeholder="Provide the approximate weight of the parcel" 
                                    />
                                  </div>
                                </div>
      
                                <div class="item actions">
                                  <button class="btn bg-light-orange medium-btn" id="createOrder-action-button">Create Order</button>
                                </div>
                              </div>
                              <div class="images column col-5">
                                <div class="image">
                                  <!-- <img src="/assets/img/packages/package-1.png" alt=""> -->
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