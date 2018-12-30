class Toast {
  static show({ message, type, autoHide, hideAfter }) {
    let className = 'toast-box';
    className += type === 'success' ? ' success' : ' warning';
    let classNames = {
      success: 'success',
      failure: 'error',
      error: 'error',
      pending: 'error',
      undefined: 'error',
    }
    
    Toast.hideTimeoutSeconds = hideAfter === undefined ? 3000 : hideAfter;

    let styleClassName = classNames[type];
    // if the type passed does not match any class value
    // then use pending as default
    styleClassName = styleClassName === undefined ? 'pending' : styleClassName;  

    Toast.typeClassName = styleClassName;

    let toastHTML = `
      <div class='${className}'>
        ${message}
      </a>
    `;

    let toastBox = document.getElementById('toast-place-holder');
    toastBox.style.padding = '20px';
    toastBox.innerHTML = toastHTML;

    Toast.animateToastIn();
    if(autoHide !== false) {
      Toast.initiateToastHide();
    }
    Toast.attachClickEvent();
  }

  static attachClickEvent() {
    let toastBox = document.querySelector('#toast-place-holder .toast-box');
    toastBox.onclick =  () => {
      clearTimeout(Toast.toastHideTimeout);
      Toast.toastHide();
    }
  }

  static toastHide() {
    let toastBox = document.querySelector('#toast-place-holder .toast-box');
    toastBox.className = `toast-box ${Toast.typeClassName}`;
    let toastBoxContainer = document.getElementById('toast-place-holder');
    toastBoxContainer.style.padding = '0px';
  }

  static animateToastIn() {
    clearTimeout(Toast.timeToAppear);
    let timeout = 100;
    this.timeToAppear = setTimeout(() => {
      let toastBox = document.querySelector('#toast-place-holder .toast-box');
      toastBox.className =  `toast-box ${Toast.typeClassName} active`;
    }, timeout);
  }

  static initiateToastHide() {
    clearTimeout(Toast.toastHideTimeout);
    this.toastHideTimeout = setTimeout(() => {
      Toast.toastHide();
    }, Toast.hideTimeoutSeconds);
  }
}

export default Toast;