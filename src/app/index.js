import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

export default class App {
  constructor() {
    this.state = {
      currentPage: this.setInitialPage()
    }

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
    let currentPage;
    switch (path) {
      case '/signup':
        currentPage = "SignUp";
        break;
      case '/login':
        currentPage = "Login";
        break;
      case '/forgot-password':
        currentPage = "ForgotPassword";
        break;
      case '/user-profile':
        currentPage = "UserProfile";
        break;
      case '/':
        currentPage = "Home";
        break;
      default:
        currentPage = "Home";
        break;
    }
    return currentPage;
  }

  setState(key, value) {
    this.state[key] = value;
    this.reRender();
    
    // 
    console.log(this.state);
  }

  reRender() {
    let appHTML = this.render();
    let target = document.getElementById("root");
    target.innerHTML = appHTML;
  }

  getCurrentPage() {
    let {
      currentPage
    } = this.state;
    let Page;
    switch (currentPage) {
      case 'Home': Page = new Home(); break;
      case 'Login': Page = new Login(); break;
      case 'SignUp': Page = new Signup(); break;
      case 'ForgotPassword': Page = new ForgotPassword(); break;
      // case 'UserProfile': Page = new UserProfile(); break;
      default: Page = new Home();
    }
    let eventListeners = Page.attachEventListeners ? Page.attachEventListeners : null;
    let appEventListeners = window.appEventListeners || [];
    window.appEventListeners = [...appEventListeners, eventListeners];
    return Page;
  }

  renderPage() {
    let page = this.getCurrentPage();
    let pageHTML = page.render();
    return pageHTML;
  }

  render() {

    let currentPage = this.renderPage();

    return `<div>
            ${currentPage}
        </div>`;
  }
}