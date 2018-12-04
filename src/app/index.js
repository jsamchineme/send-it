import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import MakeOrder from './pages/MakeOrder';
import InviteUsers from './pages/InviteUsers';
import AllParcels from './pages/AllParcels';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/Login';
import PendingParcels from './pages/PendingParcels';
import DeliveredParcels from './pages/DeliveredParcels';
import UserProfile from './pages/UserProfile';
import AdminAllParcels from './pages/admin/AllParcels';
import AdminPendingParcels from './pages/admin/PendingParcels';
import AdminDeliveredParcels from './pages/admin/DeliveredParcels';
import { routes } from '../router';
import AdminPage from './pages/middlewares/AdminPage';
import UserPage from './pages/middlewares/UserPage';
import store from './store';
import services from './services';

export default class App {
  constructor() {

    this.state = {
      currentPage: this.setInitialPage(),
    }

    this.store = store;

    /**
     * I can get all the funcs and set them as direct properties of this class
     * instead of accessing as object.funcs.functionName
     */
  }
  
  setInitialPage() {
    return this.getPathPage();
  }
  
  getPathPage(path) {
    if (path === undefined) {
      path = window.location.pathname;
    }

    let currentPage = routes[path];

    if(!currentPage) {
      // show a not found page
      window.location = '/not-found';
    }
    return currentPage;
  }

  setState(key, value) {
    this.state[key] = value;
    this.reRender();
    
    console.log(this.state);
  }

  prepareView() {
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

    // remove the "entering" class name after 1 second 
    setTimeout(() => {
      activeView.className = '';
      setTimeout(() => {
        // on applying the "out" the height of the exiting view is transited to 1
        // to avoid extra unnecesary hieght and scroll for the currently active view
        exitingView.className = 'out';
        // wait a while after transition animation has played before remove the HTML
        // within the exitingView 
        setTimeout(() => {
          // also to avoid getting duplicated ids from the two div (exiting and active)
          exitingView.innerHTML = '';
        }, 300);
      }, 100);
    }, 1000);
  }

  addEventListeners() {
    // I fetch the item at index 1 because the first one will be behind in the 
    // exiting view
    let adminLoginForm = document.getElementsByClassName('admin-login-form')[1];
    let userLoginForm = document.getElementsByClassName('user-login-form')[1];
    let signupForm = document.getElementsByClassName('signup-login-form')[1];

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
  }

  // reRender() {
  //   let appHTML = this.render();
  //   let target = document.getElementById("root");
  //   target.innerHTML = appHTML;
  // }

  async reRender() {
    this.prepareView();
    this.addEventListeners();
  }

  getCurrentPage() {
    let { currentPage } = this.state;
    let Page;
    switch (currentPage) {
      case 'Home': Page = new Home(); break;
      case 'Login': Page = new Login(); break;
      case 'SignUp': Page = new Signup(); break;
      case 'ForgotPassword': Page = new ForgotPassword(); break;
      case 'MakeOrder': Page = UserPage.guard()(new MakeOrder()); break;
      case 'InviteUsers': Page = UserPage.guard()(new InviteUsers()); break;
      case 'AllParcels': Page = UserPage.guard()(new AllParcels()); break;
      case 'PendingParcels': Page = UserPage.guard()(new PendingParcels()); break;
      case 'DeliveredParcels': Page = UserPage.guard()(new DeliveredParcels()); break;
      case 'UserProfile': Page = UserPage.guard()(new UserProfile()); break;
      case 'AdminLogin': Page = new AdminLogin(); break;
      case 'AdminAllParcels': Page = AdminPage.guard()(new AdminAllParcels()); break;
      case 'AdminPendingParcels': Page = AdminPage.guard()(new AdminPendingParcels()); break;
      case 'AdminDeliveredParcels': Page = AdminPage.guard()(new AdminDeliveredParcels()); break;
      default: Page = new NotFound();
    }
    // let eventListeners = Page.attachEventListeners ? Page.attachEventListeners : null;
    // let appEventListeners = window.appEventListeners || [];
    // window.appEventListeners = [...appEventListeners, eventListeners];
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