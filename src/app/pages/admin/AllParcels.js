import SideBar from '../../layouts/AdminSideBar';
import MobileHeader from '../../layouts/MobileHeader';
import MainPageHeader from '../../layouts/MainPageHeader';
import Parcel from '../../components/Parcel';
import { retrieveAuthUser } from "../../services/localStorage";

export default class AdminAllParcels {
  constructor() {
    document.title = "All Parcels - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
    
    // redirect user if not admin
    const savedAuthUser = retrieveAuthUser();
    if (! savedAuthUser || !savedAuthUser.isAdmin) {
      window.location.href = '/admin-login';
    }
  }
  renderProduct() {
    let productHTML = '';
    for(let i=0; i < 12; i++) {
      productHTML += Parcel();
    }
    return productHTML;
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

                    <section class="page-section items-list all-parcels">
                      <div class="header"><span>All Parcels</span></div>
                      <div class="body row auto-container gutter-20">
                        ${this.renderProduct()}
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