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
  "/user-profile": "UserProfile",
  "/forgot-password": "ForgotPassword",
  "/admin-dashboard": "AdminDashboard",
  "/make-order": "MakeOrder",
  "/all-parcels": "AllParcels",
  "/pending-parcels": "PendingParcels",
  "/delivered-parcels": "DeliveredParcels",
  "/not-found": "NotFound",
}

export const router = new Router();