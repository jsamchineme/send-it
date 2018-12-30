import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupWelcome from './pages/SignupWelcome';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import MakeOrder from './pages/MakeOrder';
import InviteUsers from './pages/InviteUsers';
import AllParcels from './pages/AllParcels';
import ParcelEntry from './pages/ParcelEntry';
import ParcelEntryEdit from './pages/ParcelEntryEdit';
import PendingParcels from './pages/PendingParcels';
import DeliveredParcels from './pages/DeliveredParcels';
import AdminAllParcels from './pages/admin/AllParcels';
import AdminParcelEntry from './pages/admin/ParcelEntry';
import AdminPendingParcels from './pages/admin/PendingParcels';
import AdminDeliveredParcels from './pages/admin/DeliveredParcels';
import AdminCancelledParcels from './pages/admin/CancelledParcels';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/Login';
import UserProfile from './pages/UserProfile';
import { routes } from './router';
import AdminPage from './pages/middlewares/AdminPage';
import UserPage from './pages/middlewares/UserPage';
import store from './store';
import services from './services';
import delay from './services/utils/delay';
import MobileMenu from './components/MobileMenu';
import Logout from './pages/middlewares/Logout';
import events from './services/events';
import subscriptions from './services/events/subscriptions';

export default class App {
  constructor() {

    this.state = {};
    this.currentPage = this.setInitialPage();
    this.events = events;
    this.store = store;
  }
  
  setInitialPage() {
    return this.getPathPage();
  }

  isAdminRoute(urlParts) {
    // if the route is not formed with "admin-dashboard" path
    // then return public page 
    // else return admin page
    let adminSearchIndex = urlParts.indexOf('admin-dashboard');
    if(adminSearchIndex === -1) {
      return false;
    } 
    return true;
  }

  getDynamicPage(currentPage, url) {
    // handing route parameter
    // Currently handling /orders/
    if(!currentPage) {
      // checking if there is parameter of parcelId in the url 
      // matching url like "localhost:3001/orders/1"
      // if correct, paramterIndex one position after the index of 'all/parcels'
      let urlParts = url.split('/');
      let parcelHomeIndex = urlParts.indexOf('orders');
      let parameterIndex = parcelHomeIndex + 1;
      
      if(urlParts[parcelHomeIndex] !== undefined
        && urlParts[parameterIndex] !== undefined) {
        let parameterValue = urlParts[parameterIndex];
        this.state['selectedParcelId'] = parameterValue;
        let isAdminRoute = this.isAdminRoute(urlParts);
        if(!isAdminRoute) {
          currentPage = 'ParcelEntry';
        } else {
          currentPage = 'AdminParcelEntry';
        }
      }

      // checking if their is parameter of email in the url 
      // matching url like "localhost:3001/password-reset/email/{email}/token/{resetToken}"
      let emailIndex = urlParts.indexOf('email');
      let emailParameterIndex = emailIndex + 1;
      
      if(urlParts[emailIndex] !== undefined
        && urlParts[emailParameterIndex] !== undefined) {
        let emailValue = urlParts[emailParameterIndex];
        this.state['userEmail'] = emailValue;
        currentPage = 'ChangePassword';
        // checking if their is parameter of token in the url 
        // matching url like "localhost:3001/password-reset/email/{email}/token/{resetToken}"
        let tokenIndex = urlParts.indexOf('token');
        let tokenParameterIndex = tokenIndex + 1;
        if(urlParts[tokenIndex] !== undefined
          && urlParts[tokenParameterIndex] !== undefined) {
          let tokenValue = urlParts[tokenParameterIndex];
          this.state['resetToken'] = tokenValue;
        }
      }

      // checking if their parameter of parcelId in the url 
      // matching url like "localhost:3001/orders/edit/1"
      // action is something like "edit"
      parcelHomeIndex = urlParts.indexOf('orders');
      let actionIndex = parcelHomeIndex + 1;
      parameterIndex = parcelHomeIndex + 2;
      if(urlParts[actionIndex] !== undefined 
        && urlParts[parameterIndex] !== undefined
        && urlParts[parcelHomeIndex] !== undefined // 'all-parcel' is found
      ) {
        let parameterValue = urlParts[parameterIndex];
        this.state['selectedParcelId'] = parameterValue;
        let isAdminRoute = this.isAdminRoute(urlParts);
        if(!isAdminRoute) {
          currentPage = 'ParcelEntryEdit';
        } else {
        }
      }
    }
    
    return currentPage;
  }
  
  getPathPage(path) {
    if (path === undefined) {
      path = window.location.pathname;
    }
    const lastIndex = path.length - 1;
    // if it is not the home page route
    if(path !== '/') {
      // if the last string is a /, 
      // remove the / so that the routes can match corresponding pages
      if (path[lastIndex] === '/') {
        path = path.slice(0,lastIndex);
      }
    }

    let currentPage = routes[path];
    let dynamicPathPage = this.getDynamicPage(currentPage, path);
    currentPage = currentPage || dynamicPathPage;

    if(!currentPage) {
      // show a not found page
      window.app.funcs.changeRoute('/not-found');
    }

    return currentPage;
  }

  setState(key, value) {
    this.state[key] = value;
    this.reRender();
  }

  async prepareRerender() {
    // get the root element of the whole view
    let target = document.getElementById("root");
    
    let activeView = document.getElementById('active-view');
    
    let activeViewHTML = app.render();

    activeView.innerHTML = activeViewHTML;

    let result = await target.appendChild(activeView);
  }

  async prepareView() {
    // to get page transition animations
    // get the html
    // create two nodes
    // one for the current view's html
    // the other for the new view's html
    // load the both to the root

    // get the root element of the whole view
    let target = document.getElementById("root");
    
    let exitingView = document.getElementById('exiting-view');
    let activeView = document.getElementById('active-view');

    // active view is the container to hold new active content after page transition
    // activeView is undefined when the page is just loading for the first time
    if(!activeView) {
      activeView = document.createElement("div");
      activeView.id = 'active-view';
    }
        
    // exiting view is the container to hold formerly active content after page transition
    // exitingView is undefined when the page is just loading for the first time
    if(!exitingView) {      
      exitingView = document.createElement("div");
      exitingView.id = 'exiting-view';
    } else {
      // place the HTML from the last active view into the exiting view
      exitingView.innerHTML = activeView.innerHTML;
    }
    
    let activeViewHTML = app.render();
    activeView.innerHTML = activeViewHTML;

    exitingView.className = '';
    activeView.className = 'entering';

    target.appendChild(exitingView);
    target.appendChild(activeView);

    await this.animateTransition(activeView, exitingView);

    events.emit(subscriptions.DOM_READY);
  }

  async animateTransition(activeView, exitingView) {
    await delay(1000); 
    // remove the "entering" class name after 1 second
    activeView.className = '';
    await delay(100); 
    // on applying the "out" the height of the exiting view is transited to 1
    // to avoid extra unnecesary hieght and scroll for the currently active view
    exitingView.className = 'out';
    // wait a while after transition animation has played before remove the HTML
    // within the exitingView 
    await delay(300);
    // also to avoid getting duplicated ids from the two div (exiting and active)
    exitingView.innerHTML = '';
    // console.clear();
  }

  bindClassNames(className, eventName, listener) {
    let collection = document.getElementsByClassName(className);
    if(collection.length > 0) {

      for(let i = 0; i < collection.length; i++) {
        let item = collection[i];
        item.addEventListener(eventName, listener);
      }
    }
  }

  addEventListeners() {
    // I fetch the item at index 1 because the first one will be behind in the 
    // exiting view
    let adminLoginForm = document.querySelector('.admin-login-form');
    let userLoginForm = document.querySelector('.user-login-form');
    let signupForm = document.querySelector('.user-signup-form');
    let createOrderForm = document.querySelector('.create-order-form');
    let passwordChangeForm = document.querySelector('.password-change-form');
    let passwordResetForm = document.querySelector('.password-reset-form');

    // attach event handlers to elements
    let { actions } = services;

    if(adminLoginForm) { 
      adminLoginForm.addEventListener('submit', actions.adminLogin);
      adminLoginForm.addEventListener('input', actions.saveInput.bind(this, 'adminLogin'));
    }
    if(userLoginForm) { 
      userLoginForm.addEventListener('submit', actions.userLogin);
      userLoginForm.addEventListener('input', actions.saveInput.bind(this, 'userLogin'));
    }
    if(signupForm) { 
      signupForm.addEventListener('submit', actions.userSignup);
      signupForm.addEventListener('input', actions.saveInput.bind(this, 'userSignup'));
    }
    if(createOrderForm) { 
      createOrderForm.addEventListener('submit', actions.createOrder);
      createOrderForm.addEventListener('input', actions.saveInput.bind(this, 'createOrder'));
    }

    if(passwordChangeForm) {
      passwordChangeForm.addEventListener('submit', actions.changePassword);
      passwordChangeForm.addEventListener('input', actions.saveInput.bind(this, 'changePassword'));
    }

    if(passwordResetForm) {
      passwordResetForm.addEventListener('submit', actions.resetPassword);
      passwordResetForm.addEventListener('input', actions.saveInput.bind(this, 'resetPassword'));
    }

    // attach mobile menu events
    let menuIcon = document.getElementById('toggle-mobile-menu');
    if (menuIcon) { MobileMenu.init(); } 
  }

  /**
   * Send off requests that have been populates by all the components rendered
   * The constructor method of any components or pages loaded could contain 
   * requests required to return some data for rendering to the view
   * the Class that prepares any components will have function to handle 
   * successful retrieval of the request.
   */
  dispatchRequests() {
    // allRequests is an Object of requestNames: action function
    const allRequests = window.requests || {};
    let actions = Object.keys(allRequests);
    actions.forEach(action => {
      // fire the action
      allRequests[action]();
      // remove the request/action from the stack
      delete allRequests[action];
    });
    
  }

  async reRender() {
    await this.prepareRerender();

    this.addEventListeners();
  }

  clearEventSubscriptions() {
    // clear existing subscriptions from all components
    // to avoid conflicts with other Pages Components
    let eventsToSkip = [
      subscriptions.REQUEST_PENDING,
      subscriptions.REQUEST_DONE
    ];

    let allEvents = Object.keys(this.events.events);
    allEvents.forEach(item => {
      // if item is not found in the list of events to skip
      // then put them off
      if(eventsToSkip.find(i => i === item ) === undefined) {
        this.events.off(item);
      }
    });

    console.log({event: events.events})
  }

  async loadView() {
    await this.prepareView();
    this.dispatchRequests();
    this.addEventListeners();
  }

  getCurrentPage() {
    let { currentPage } = this.state;
    let Page;
    switch (currentPage) {
      case 'Home': Page = new Home(); break;
      case 'Login': Page = new Login(); break;
      case 'SignUp': Page = new Signup(); break;
      case 'SignUpWelcome': Page = new SignupWelcome(); break;
      case 'ForgotPassword': Page = new ForgotPassword(); break;
      case 'ChangePassword': Page = new ChangePassword(); break;
      case 'MakeOrder': Page = UserPage.guard()(new MakeOrder()); break;
      case 'InviteUsers': Page = UserPage.guard()(new InviteUsers()); break;
      case 'AllParcels': Page = UserPage.guard()(new AllParcels()); break;
      case 'ParcelEntry': Page = UserPage.guard()(new ParcelEntry()); break;
      case 'ParcelEntryEdit': Page = UserPage.guard()(new ParcelEntryEdit()); break;
      case 'PendingParcels': Page = UserPage.guard()(new PendingParcels()); break;
      case 'DeliveredParcels': Page = UserPage.guard()(new DeliveredParcels()); break;
      case 'UserProfile': Page = UserPage.guard()(new UserProfile()); break;
      case 'AdminLogin': Page = new AdminLogin(); break;
      case 'AdminAllParcels': Page = AdminPage.guard()(new AdminAllParcels()); break;
      case 'AdminPendingParcels': Page = AdminPage.guard()(new AdminPendingParcels()); break;
      case 'AdminDeliveredParcels': Page = AdminPage.guard()(new AdminDeliveredParcels()); break;
      case 'AdminCancelledParcels': Page = AdminPage.guard()(new AdminCancelledParcels()); break;
      case 'AdminParcelEntry': Page = AdminPage.guard()(new AdminParcelEntry()); break;
      case 'Logout': Page = new Logout(); break;
      default: Page = new NotFound();
    }
    return Page;
  }

  renderPage() {
    let page = this.getCurrentPage();
    let pageHTML = page.render();
    return pageHTML;
  }

  render() {

    let currentPage = this.renderPage();

    return `<div> ${currentPage} </div>`;
  }
}