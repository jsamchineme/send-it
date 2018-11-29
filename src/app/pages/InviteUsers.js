import Link from '../components/Link';

export default class InviteUsers {
  constructor() {
    document.title = "Invitations - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    return (`
      <div class="wrapper">
        <section class="page-content">
          <section class="mast no-bg paddless">
            ${Link({
              to:'/', 
              text:`<div class="logo"><img src="assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
              <div class="text">Send<span>IT</span></div>`, 
              className: 'logo-text-group', 
              style:''}
            )}
          </section>
          <div class="login-box">
            <form action="">
              <div class="form-header">
                <span>Invite Users</span>
                <div class="v-gap-1"></div>
                <div class='tip'>Please an email to invite</div>
              </div>
              <div class="form-body">
                <div class="input-group">
                  <input type="email" placeholder='email' required />
                </div>
                <div class="input-footer"></div>
                <div class="v-gap-2"></div>

                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit">Send Invitation</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <div class="page-background">
          <div class="overlay"></div>
        </div>
      </div>
    `);
  }
}