import Link from '../components/Link';

export default class Signup {
  constructor() {
    document.title = "Signup - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    return (`
      <div class="wrapper">
        <section class="page-content">
          <section class="mast no-bg paddless">
            ${Link({
              to:'/home', 
              text:`<div class="logo"><img src="/assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
              <div class="text">Send<span>IT</span></div>`, 
              className: 'logo-text-group', 
              style:''}
            )}

          </section>
          <div class="login-box">
            <form 
              class="user-signup-form"
              action="/user-profile"
            >
              <div class="form-header">
                Sign up
                <div id='server-error-box' class='error-box'></div>
              </div>
              <div class="form-body">
                <div class="input-group transparent-box">
                  <label for="firstname">Firstname</label>
                  <div id='firstname-error-box' class='error-box'></div>
                  <input 
                    type="text" 
                    placeholder='Firstname' 
                    name='firstname'
                  />
                </div>
                <div class="input-group transparent-box">
                  <label for="lastname">Lastname</label>
                  <div id='lastname-error-box' class='error-box'></div>
                  <input 
                    type="text" 
                    placeholder='Lastname'
                    name='lastname'
                  /> 
                </div>
                <div class="input-group transparent-box">
                  <label for="email">Email</label>
                  <div id='email-error-box' class='error-box'></div>
                  <input 
                    type="email" 
                    placeholder='your email' 
                    name='email'
                  />
                </div>
                <div class="input-group transparent-box">
                  <label for="username">Username</label>
                  <div id='username-error-box' class='error-box'></div>
                  <input 
                    type="text" 
                    placeholder='username'
                    name='username'
                  />
                </div>
                <div class="input-group transparent-box">
                  <label for="password">Password</label>
                  <div id='password-error-box' class='error-box'></div>
                  <input
                    type="password" 
                    placeholder='securepassword'
                    name='password'
                  />
                </div>
                <div class="input-footer"></div>
                <div class="v-gap-2"></div>
                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit" id="userSignup-action-button">Sign up</button>
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