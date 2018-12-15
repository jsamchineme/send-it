
export default class MobileMenu {
  static init() {
    window.app.state.mobileMenuOpen = false;
    let mobileIcon = document.getElementById('toggle-mobile-menu');
    MobileMenu.overlay = document.getElementById('menu-active-overlay');
    MobileMenu.sideMenu = document.getElementById('mobile-side-menu');
    MobileMenu.sideMenu.addEventListener('click', MobileMenu.toggleSideMenu);

    window.app.bindClassNames('mobile-side-link', 'click', 
      (e) => {
        MobileMenu.toggleSideMenu(e);
        window.app.funcs.changeRoute(e.target.dataset.linkTo)
    });

    MobileMenu.menuIcon = mobileIcon;
    mobileIcon.addEventListener('click', MobileMenu.toggleSideMenu);
    MobileMenu.overlay.addEventListener('click', MobileMenu.toggleSideMenu);

    if(window.app.state.mobileMenuOpen) {
      MobileMenu.sideMenu.className = 'mobile-side-menu active';
      MobileMenu.showOverlay();
      window.app.state.mobileMenuOpen = true;
    } else {
      MobileMenu.sideMenu.className = 'mobile-side-menu';
      MobileMenu.hideOverlay();
      window.app.state.mobileMenuOpen = false;
    }
  }

  /**
   * Side Link Click
   */
  handleMenuLink(e) {
    
  }

  /**
   * Toggle the state of the side menu
   * @param {Event} e - event object
   */
  static toggleSideMenu(e) {
    e.preventDefault();

    if(window.app.state.mobileMenuOpen) {
      MobileMenu.sideMenu.className = 'mobile-side-menu';
      MobileMenu.hideOverlay();
      window.app.state.mobileMenuOpen = false;
    } else {
      MobileMenu.sideMenu.className = 'mobile-side-menu active';
      MobileMenu.showOverlay();
      window.app.state.mobileMenuOpen = true;
    }
  }

  /**
   * Hide the overlay box
   */
  static hideOverlay() {
    MobileMenu.overlay.className = 'shown';
    setTimeout(() => {
      MobileMenu.overlay.className = 'hidden';
    }, 500);
  }
  
  /**
   * Show the overlay box
   */
  static showOverlay() {
    MobileMenu.overlay.className = 'shown';
    setTimeout(() => {
      MobileMenu.overlay.className = 'shown active';
    }, 0);
  }
}