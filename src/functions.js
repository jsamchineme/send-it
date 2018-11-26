export const getProducts = (id) => {
  let { products } = _this.state; 
  let product = products.find(t => t.id ===id); 
  let newProducts = [...products, product];
  _this.setState('products', newProducts);
}

export const setRouter = (path) => {
  if(path === undefined) {
      path = window.location.pathname;
  }
  let currentPage;
  switch(path) {
      case '/signup': currentPage = "SignUp"; break;
      case '/entries': currentPage = "Entries"; break;
      case '/add-entry': currentPage = "AddEntry"; break;
      case '/edit-entry': currentPage = "EditEntry"; break;
      case '/view-entry': currentPage = "ViewEntry"; break;
      case '/user-detail': currentPage = "UserDetail"; break;
      case '/signin': currentPage = "SignIn"; break;
      case '/': currentPage = "Home"; break;
      default: currentPage = "Home"; break;
  }

  _this.setState('currentPage', currentPage);
}

export const linkHandler = (elem) => {
  let destination = elem.getAttribute("href");
  let { origin } = window.location;
  let href = `${origin}${destination}`;
  window.history.pushState({}, '', href);
  _this.funcs.setRouter(destination);
}
