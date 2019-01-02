class Router {
  constructor() {
    this.handlers = {};
  }

  set(route, handler) {
    this.handlers[route] = handler;
  }
}

export const routes = {
  "/": "Home",
  "/home": "Home",
  "/signup": 'SignUp',
  "/signup/welcome": 'SignUpWelcome',
  "/login": "Login",
  "/admin-login": "AdminLogin",
  "/user-profile": "UserProfile",
  "/forgot-password": "ForgotPassword",
  "/change-password": "ChangePassword",
  "/make-order": "MakeOrder",
  "/orders": "AllParcels",
  "/pending-orders": "PendingParcels",
  "/delivered-orders": "DeliveredParcels",
  "/cancelled-orders": "CancelledParcels",
  "/admin-dashboard/orders": "AdminAllParcels",
  "/admin-dashboard/pending-orders": "AdminPendingParcels",
  "/admin-dashboard/delivered-orders": "AdminDeliveredParcels",
  "/admin-dashboard/cancelled-orders": "AdminCancelledParcels",
  "/not-found": "NotFound",
  "/logout": "Logout",
}

export const router = new Router();