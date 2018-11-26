import App from './app';

import {
  router
} from './router';

// router.set('/signup', (e) => {
//   console.log("router", router.handlers);
// });

let app = new App();

document.title = "Send-IT";
window.appEventListeners = [];

app.funcs = {
  init() {
    // add some initial load calls here
    this.setRouter();
    window.onpopstate = () => this.setRouter();
    this.renderPage();

    // this.signup = signup;
  },
  renderPage: () => {
    let target = document.getElementById("root");
    let appHTML = app.render();
    target.innerHTML = appHTML;
  },
  /**
   * Apply the route path and render the current page based on the route
   */
  setRouter: (path) => {
    if (path === undefined) {
      path = window.location.pathname;
    }
    // setting up routes and pages
    let routes = {
      "/signup": 'SignUp',
      "/login": "Login",
      "/user-profile": "UserProfile",
      "/forgot-password": "ForgotPassword",
      "/admin-dashboard": "AdminDashboard",
      "/": "Home",
    }

    let currentPage = routes[path];

    app.setState('currentPage', currentPage);
  },
  linkHandler: (elem) => {
    let destination = elem.getAttribute("href");
    let {
      origin
    } = window.location;
    // preparing the route to switch to
    let href = `${origin}${destination}`;
    // pushing prepared route to the window history object 
    window.history.pushState({}, '', href);
    // set the new page route
    app.funcs.setRouter(destination);

    // run any of the functions attached to a particular route when the route is navigated to
    router.handlers[destination] ? router.handlers[destination]() : null;
  }

}


window.app = app;
window.app.funcs.init();