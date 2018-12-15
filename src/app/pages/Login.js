import Link from '../components/Link';

export default class Login {
  constructor() {
    document.title = "Login - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    return (`
      <div class="wrapper">
        <div id="toast-place-holder"></div>
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
              action="user-profile"
              class="user-login-form"
            >
              <div class="form-header">
                Login
                <div id='server-error-box' class='error-box'></div>
              </div>
              <div class="form-body">
                <div class="input-group transparent-box">
                  <label for="email">Email</label>
                  <div id='email-error-box' class='error-box'></div>
                  <input 
                    type="text" 
                    placeholder='your email' 
                    name='email'
                  />
                </div>
                <div class="input-group transparent-box">
                  <label for="password">Password</label>
                  <div id='password-error-box' class='error-box'></div>
                  <input 
                    type="password" 
                    placeholder='your password' 
                    name='password'
                  /> 
                </div>
                <div class="input-footer"></div>
                <!-- <div class="v-gap-2"></div> -->
                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit" id='userLogin-action-button'>Login</button>
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