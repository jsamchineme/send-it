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
  "/signup": 'SignUp',
  "/login": "Login",
  "/admin-login": "AdminLogin",
  "/user-profile": "UserProfile",
  "/forgot-password": "ForgotPassword",
  "/make-order": "MakeOrder",
  "/all-parcels": "AllParcels",
  "/pending-parcels": "PendingParcels",
  "/delivered-parcels": "DeliveredParcels",
  "/admin-dashboard/all-parcels": "AdminAllParcels",
  "/admin-dashboard/pending-parcels": "AdminPendingParcels",
  "/admin-dashboard/delivered-parcels": "AdminDeliveredParcels",
  "/not-found": "NotFound",
}

export const router = new Router();