class Toast {
  static show({ message, type, autoHide }) {
    let className = 'toast-box';
    className += type === 'success' ? ' success' : ' warning';
    let classNames = {
      success: 'success',
      failure: 'error',
      error: 'error',
      pending: 'error',
      undefined: 'error',
    }
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
      clearTimeout(Toast.timeToHide);
      Toast.toastHide();
    }
  }

  static toastHide() {
    let toastBox = document.querySelector('#toast-place-holder .toast-box');
    toastBox.className = `toast-box ${Toast.typeClassName}`;
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
    clearTimeout(Toast.timeToHide);
    let timeout = 3000;
    this.timeToHide = setTimeout(() => {
      Toast.toastHide();
    }, timeout);
  }
}

export default Toast;