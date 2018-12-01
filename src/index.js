import App from './app';
import { router, routes } from './router';
import services from './app/services';


let app = new App();

window.appEventListeners = [];

app.funcs = {
  /**
   * initialise the app and prepare the first rendering
   */
  init() {
    // add some initial load calls here
    this.setRouter();
    window.onpopstate = () => this.setRouter();

    // render the page the first time.
    this.renderPage();
  },
  /**
   * render the view
   */
  renderPage: async () => {
    await app.reRender();
    // add all event handler 
    
    // .addEventListener('click', window.services.api.userLogin);
  },
  /**
   * Apply the route path and render the current page based on the route
   */
  setRouter: (path) => {
    if (path === undefined) {
      path = window.location.pathname;
    }

    let currentPage = routes[path];

    // app.setState triggers a re-render of the view
    app.setState('currentPage', currentPage);
  },
  /**
   * handling the click event on all links
   * this will determine the url to navigate to
   * by reading the href attribute of the anchor tag
   */
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
const actions = services;
window.app.funcs.init();