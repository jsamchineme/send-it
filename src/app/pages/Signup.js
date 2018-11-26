import Link from '../components/Link';

export default class Signup {
  render() {
    return (`
      <div class="wrapper">
        <section class="page-content">
          <section class="mast no-bg paddless">
            ${Link({
              to:'/home', 
              text:`<div class="logo"><img src="assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
              <div class="text">Send<span>IT</span></div>`, 
              className: 'logo-text-group', 
              style:''}
            )}

          </section>
          <div class="login-box">
            <form action="/user-profile">
              <div class="form-header">
                Sign up
              </div>
              <div class="form-body">
                <div class="input-group transparent-box">
                  <label for="firstname">Firstname</label>
                  <input type="text" placeholder='Firstname' required/>
                </div>
                <div class="input-group transparent-box">
                  <label for="lastname">Lastname</label>
                  <input type="text" placeholder='Lastname' required/> 
                </div>
                <div class="input-group transparent-box">
                  <label for="email">Email</label>
                  <input type="email" placeholder='you@email.com' required/>
                </div>
                <div class="input-group transparent-box">
                  <label for="password">Password</label>
                  <input type="password" placeholder='securepassword' required/> 
                </div>
                <div class="input-footer"></div>
                <div class="v-gap-2"></div>
                <div class="row text-center">
                  <div class="column">
                    <button class="btn submit">Sign up</button>
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