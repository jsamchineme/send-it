import Link from '../components/Link';

export default class ChangePassword {
  constructor() {
    document.title = "Change password - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    let email = window.app.state['userEmail'];

    return (`
      <div class="wrapper">
        <section class="page-content">
          <div id="toast-place-holder"></div>
          <section class="mast no-bg paddless">
            ${Link({
              to:'/', 
              text:`<div class="logo"><img src="/assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
              <div class="text">Send<span>IT</span></div>`, 
              className: 'logo-text-group', 
              style:''}
            )}
          </section>
          <div class="login-box">
            <form 
              action=""
              class="password-change-form"
            >
              <div class="form-header">
                <span>Change Password</span>
                <div id='server-error-box' class='error-box'></div>
              </div>
              <div class="form-body">
                <div class="input-group transparent-box">
                  <label for="email">Email</label>
                  <input type="email" id='email' placeholder='your email' value='${email}' disabled />
                </div>
                <div class="input-group transparent-box">
                  <label for="email">Email</label>
                  <div id='password-error-box' class='error-box'></div>
                  <input type="password" name='password' placeholder='new password' required/>
                </div>
                <div class="input-footer"></div>
                <div class="v-gap-2"></div>
                
                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit" id="changePassword-action-button">Change Password</button>
                  </div>
                  <div class="actions column text-center">
                    <div class="v-gap-2"></div>
                    <div class="">
                      ${Link({to:'/login', text:`Login`, className: '', style:''})}
                    </div>
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