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
              to:'/admin-dashboard/all-parcels', 
              text:`<i class=""></i>All Orders`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/admin-dashboard/pending-parcels', 
              text:`<i class=""></i>Pending Orders`, 
            })}
          </li>
          <li>
            ${Link({
              to:'/admin-dashboard/delivered-parcels', 
              text:`<i class=""></i>Delivered Parcels`, 
            })}
          </li>
        </ul>
      </div>
    </aside>
  `);
}

export default SideBar;