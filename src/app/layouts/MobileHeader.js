import Link from '../components/Link';
import { retrieveAuthUser } from '../services/localStorage';


const MobileHeader = () => {
  const authUser = retrieveAuthUser();
  if(authUser.isAdmin) {
    return adminHeader();
  } 
  return userHeader();
}

const adminHeader = () => {
  return (`
    <div class="mobile-header hide-for-large">
      <div class="top-bar">
        <div class="text">
          <div class="name"></div>
        </div>
        <div class="icons">
          <span href="#" class="drop-down-container">
            <span href="#" class='icon-group'>
              <span class="fa fa-user"></span>
            </span>
            <div class="drop-down">
              <ul>
                <li>
                  ${Link({
                    to:'/logout', 
                    text:`Logout`, 
                  })}
                </li>
              </ul>
            </div>
          </span>
          <span href="#" class="icon-group" id="toggle-mobile-menu">
            <span class="fa fa-navicon"></span>
          </span>
        </div>
      </div>
      <div class="mobile-side-menu" id="mobile-side-menu">
        <ul class="side-links">
          <li class='mobile-side-link' data-link-to='/admin-dashboard/orders'>
            ${Link({
              to:'/admin-dashboard/orders', 
              text:`<i class=""></i>All Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/admin-dashboard/pending-orders'>
            ${Link({
              to:'/admin-dashboard/pending-orders', 
              text:`<i class=""></i>Pending Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/admin-dashboard/delivered-orders'>
            ${Link({
              to:'/admin-dashboard/delivered-orders', 
              text:`<i class=""></i>Delivered Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/admin-dashboard/cancelled-orders'>
            ${Link({
              to:'/admin-dashboard/cancelled-orders', 
              text:`<i class=""></i>Cancelled Orders`, 
              noAction: true,
            })}
          </li>
        </ul>
      </div>
    </div>
  `)
}

const userHeader = () => {
  return (`
    <div class="mobile-header hide-for-large">
      <div class="top-bar">
        <div class="text" style='padding-left: 0px'>
          <div class="name"></div>
          <span href="#" class="icon-group" id="toggle-mobile-menu">
            <span class="fa fa-navicon"></span>
          </span>
        </div>
        <div class="icons">
          <span href="#" class="drop-down-container">
            <span href="#" class='icon-group'>
              <span class="fa fa-user"></span>
            </span>
            <div class="drop-down">
              <ul>
                <!-- <li><a href="#">Settings</a></li> -->
                <li>
                  ${Link({
                    to:'/user-profile', 
                    text:`Profile`, 
                  })}
                </li>
                <li>
                  ${Link({
                    to:'/logout', 
                    text:`Logout`, 
                  })}
                </li>
              </ul>
            </div>
          </span>
          
        </div>
      </div>
      <div class="mobile-side-menu" id="mobile-side-menu">
        <ul class="side-links">
          <li class='mobile-side-link' data-link-to='/make-order'>
            ${Link({
              to:'/make-order', 
              text:`<i class=""></i>Make an Order`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/orders'>
            ${Link({
              to:'/orders', 
              text:`<i class=""></i>See Your Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/pending-orders'>
            ${Link({
              to:'/pending-orders', 
              text:`<i class=""></i>Pending Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/delivered-orders'>
            ${Link({
              to:'/delivered-orders', 
              text:`<i class=""></i>Delivered Orders`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/user-profile'>
            ${Link({
              to:'/user-profile', 
              text:`<i class=""></i>My Profile`, 
              noAction: true,
            })}
          </li>
        </ul>
      </div>
    </div>
  `)
}


export default MobileHeader;
            