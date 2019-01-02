import Link from '../components/Link';

const SideBar = () => {
  return (`
    <aside class='actions-sidebar show-for-large'>
      <div class="header">
        ${Link({
          to:'/', 
          text:`<div class="logo"><img src="/assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
          <div class="text">Send<span>IT</span></div>`, 
          className: 'logo-text-group', 
        })}
      </div>
      <div class="content">
        <ul class="side-links">
          <li>
            ${Link({
              to:'/make-order', 
              text:`<i class=""></i>Make an Order`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/orders', 
              text:`<i class=""></i>See Your Orders`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/pending-orders', 
              text:`<i class=""></i>Pending Orders`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/delivered-orders', 
              text:`<i class=""></i>Delivered Orders`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/cancelled-orders', 
              text:`<i class=""></i>Cancelled Orders`, 
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
    </aside>
  `);
}

export default SideBar;