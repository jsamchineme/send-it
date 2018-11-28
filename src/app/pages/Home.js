import Link from '../components/Link';

export default class Home {
  render() {
    return (`
      <div class="wrapper" style='background: white;'>
        <div class="page-content">
          <div class='mast-banner' style='background-image: url(assets/img/sending-package.jpg)'>
            <section class="mast theme-dark">
              ${Link({
                to:'/', 
                text:`<div class="logo"><img src="assets/img/sendit-pickup-ondemand.svg" alt="sendit-logo" /></div>
                <div class="text">Send<span>IT</span></div>`, 
                className: 'logo-text-group', 
                style:''}
              )}
            </section>
            <section class='landing-intro'>
              <div class="container">
                <div class="left-content">
                  <div class="image">
                    <img src="assets/img/package-landing-image.jpg" alt="sendit landing introduction image" />
                  </div>
                </div>
                <div class="right-content">
                  <div class="landing-text">
                    <div class="text-1">Send Packages Anywhere.</div>
                    <div class="text-2">We pick up, deliver and even let you track the process.</div>
                    <div class="text-3">Ain't that cool?</div>
                  </div>
                  <div class="actions">
                    ${Link({to:'/login', text:`Get Started`, className: 'button cta', style:''})}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section class='value-props'>
            <div>
              <!-- <h2>What SendIT can do for you</h2> -->
            </div>
            <div class="items row auto-container">
              <div class="item column col-4">
                <div class="image"><img src="assets/img/sendit-pickup-ondemand.svg" alt="" /></div>
                <div class="text">Pickup On Demand</div>
              </div>
              <div class="item column col-4">
                <div class="image"><img src="assets/img/sendit-timely-delivery.svg" alt="" /></div>
                <div class="text">Timely Delivery</div>
              </div>
              <div class="item column col-4">
                <div class="image"><img src="assets/img/sendit-track-package.svg" alt="" /></div>
                <div class="text">Track Order</div>
              </div>
            </div>
          </section>
          <section class='footer'>
            <div class="row action-banners">
              <div class="item column col-6">
                <div class="container" style="background-image: url('assets/img/sending-package.jpg')">
                  <div class="bg">
                    <div class="text">Got Package?</div>
                    ${Link({to:'/login', text:`SEND IT`, className: 'btn small cta theme-orange', style:''})}
                  </div>
                </div>
              </div>
              <div class="item column col-6">
                <div class="container" style="background-image: url('assets/img/tracking-image.jpg')">
                  <div class="bg">
                    <div class="text">Sent Package?</div>
                    ${Link({to:'/login', text:`TRACK IT`, className: 'btn small cta theme-orange', style:''})}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="page">
          <div class="overlay"></div>
        </div>
      </div>
    `);
  }
}