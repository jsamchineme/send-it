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
                <li><a href="#">Settings</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="login.html">Logout</a></li>
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
          <li>
            ${Link({
              to:'/make-order', 
              text:`<i class=""></i>Make an Order`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/invite-users', 
              text:`<i class=""></i>Invite Users`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/all-parcels', 
              text:`<i class=""></i>See Your Parcels`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/track-parcels', 
              text:`<i class=""></i>Pending Parcels`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/delivered-parcels', 
              text:`<i class=""></i>Delivered Parcels`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/user-profile', 
              text:`<i class=""></i>My Profile`, 
            })}
          </li>
        </ul>
      </div>
    </div>
  `);
}

export default MobileHeader;
            