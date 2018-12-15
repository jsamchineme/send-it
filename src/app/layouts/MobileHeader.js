import Link from '../components/Link';

const MobileHeader = () => {
  return (`
    <div class="mobile-header hide-for-large">
      <div class="top-bar">
        <div class="text">
          <div class="name">John Doe</div>
        </div>
        <div class="icons">
          <a class="icon-group notification">
            <span class="fa fa-bell"></span>
          </a>
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
          <span href="#" class="icon-group" id="toggle-mobile-menu">
            <span class="fa fa-navicon"></span>
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
          <li class='mobile-side-link' data-link-to='/all-parcels'>
            ${Link({
              to:'/all-parcels', 
              text:`<i class=""></i>See Your Parcels`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/pending-parcels'>
            ${Link({
              to:'/pending-parcels', 
              text:`<i class=""></i>Pending Parcels`, 
              noAction: true,
            })}
          </li>
          <li class='mobile-side-link' data-link-to='/delivered-parcels'>
            ${Link({
              to:'/delivered-parcels', 
              text:`<i class=""></i>Delivered Parcels`, 
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
  `);
}

export default MobileHeader;
            