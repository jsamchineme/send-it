import Link from '../components/Link';

export default class SignupWelcome {
  constructor() {
    document.title = "Signup - Send IT - Send Parcels Anywhere | Timely Delivery | Real Time Tracking";
  }
  render() {
    return (`
      <div class="wrapper signup-welcome">
        <div class="page-content">
          <div class='mast-banner'>
            <section class="mast theme-dark">
              ${Link({
                to:'/', 
                text:`<div class="logo"><img src="/assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
                <div class="text">Send<span>IT</span></div>`, 
                className: 'logo-text-group', 
                style:''}
              )}
            </section>
            <section class='landing-intro'>
              <div class="container">
                <div class="right-content">
                  <div class="landing-text">
                    <div class="text-1">Great!</div>
                    <div class="text-2">You can now login to start sending parcels</div>
                    <!-- <div class="text-3">Ain't that cool?</div> -->
                  </div>
                  <div class="actions">
                    ${Link({to:'/login', text:`Login`, className: 'button cta', style:''})}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="page-background">
          <div class="overlay"></div>
        </div>
      </div>
    `);
  }
}