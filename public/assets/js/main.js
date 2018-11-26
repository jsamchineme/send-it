document.getElementById('toggle-mobile-menu').addEventListener('click', toggleSideMenu);
let menuActiveOverlay = document.getElementById('menu-active-overlay');
menuActiveOverlay.addEventListener('click', toggleSideMenu);

let mobileMenu = document.getElementById('mobile-side-menu');

let state = {
  mobileMenuOpen: false
};

init();

function init() {
  renderMobileMenu();
}

function renderMobileMenu() {
  if(state.mobileMenuOpen) {
    mobileMenu.className = 'mobile-side-menu active';
    showOverlay();
    state.mobileMenuOpen = true;
  } else {
    mobileMenu.className = 'mobile-side-menu';
    hideOverlay();
    state.mobileMenuOpen = false;
  }
}

function toggleSideMenu(e) {
  e.preventDefault();

  if(state.mobileMenuOpen) {
    mobileMenu.className = 'mobile-side-menu';
    state.mobileMenuOpen = false;
    hideOverlay();
  } else {
    mobileMenu.className = 'mobile-side-menu active';
    showOverlay();
    state.mobileMenuOpen = true;
  }
}

function hideOverlay() {
  menuActiveOverlay.className = 'shown';
  setTimeout(() => {
    menuActiveOverlay.className = 'hidden';
  }, 500);
}
function showOverlay() {
  menuActiveOverlay.className = 'shown';
  setTimeout(() => {
    menuActiveOverlay.className = 'shown active';
  }, 0);
}