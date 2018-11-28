class Router {
  constructor() {
    this.handlers = {};
  }

  set(route, handler) {
    this.handlers[route] = handler;
  }
}

export const router = new Router();