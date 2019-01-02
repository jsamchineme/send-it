import Link from '../../components/Link';

export default class Login {
  constructor() {
    document.title = "Login - Send IT - Send Orders Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    return (`
      <div class="wrapper">
        <section class="page-content">
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
              class="admin-login-form"
              action="/admin-dashboard"
            >
              <div class="form-header">
                Admin Login
                <div id='server-error-box' class='error-box'></div>
              </div>
              <div class="form-body">
                <div class="input-group transparent-box">
                  <!-- <div class="info">
                    <span class="error">This is a required field</span>
                  </div> -->
                  <label for="email">Email</label>
                  <div id='email-error-box' class='error-box'></div>
                  <input 
                    type="email" 
                    placeholder='your email' 
                    name='email'
                    value=''
                  />
                </div>
                <div class="input-group transparent-box">
                  <label for="password">Password</label>
                  <div id='password-error-box' class='error-box'></div>
                  <input 
                    type="password" 
                    placeholder='your password' 
                    name='password'
                    value=''
                  />
                </div>
                <div class="input-footer"></div>
                <!-- <div class="v-gap-2"></div> -->
                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit" id="adminLogin-action-button">Login</button>
                  </div>
                  <div class="actions column text-center">
                    <div class="v-gap-2"></div>
                    <div class="">
                      ${Link({to:'/signup', text:`Sign up`, className: '', style:''})}
                      <span style="margin-right: 10px; display: inline-block;"></span>
                      ${Link({to:'/forgot-password', text:`Forgot password`, className: '', style:''})}
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