import { clearAuthUser, retrieveAuthUser } from "../../services/localStorage";

export default class Logout {
  constructor() {
    let authUser = retrieveAuthUser();
    if(authUser) {
      if(authUser.isAdmin) {
        // window.app.funcs.changeRoute('/admin-login');
        window.location.href = '/admin-login';
        clearAuthUser();
      } else {
        // window.app.funcs.changeRoute('/login');
        window.location.href = '/login';
        clearAuthUser();
      }
    } else {
      // window.app.funcs.changeRoute('/login');
      window.location.href = '/login';
      clearAuthUser();
    }
  }

  render() {
    return `
      <div class='page-loading'></div>
    `;
  }
}