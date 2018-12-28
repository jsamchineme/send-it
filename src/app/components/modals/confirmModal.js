import delay from "../../services/utils/delay";

export const modalCancelAction = () => {
  closeModal();

  let { noAction } = window.confirmModal;
  if (typeof noAction === 'function') {
    noAction();
  }
}

export const modalConfirmAction = (yes) => {
  closeModal();

  let { yesAction } = window.confirmModal;

  if (typeof yesAction === 'function') {
    yesAction();
  }
}

export const closeModal = () => {
  let modalWindow = document.getElementById('modal-window');
  modalWindow.className = 'modal-view'; // reset to initial state
}

export const activateModal = () => {
  let modalWindow = document.getElementById('modal-window');
  modalWindow.className = 'modal-view active';
}

const confirmModalBox = ({title, description, yesAction, noAction}) => {
  window.confirmModal = { title, yesAction, noAction };

  let boxHTML =`
    <div class='confirm-modal'>
      <div class='box'>
        <header>
          <div class='title'>${title}</div>
        </header>
        <body>
          <div class='description'>${description}</div>
          <div class='actions'>
            <button class='btn confirm-modal-btn' id='yes-btn'>Yes</button>
            <button class='btn decline-modal-btn' id='no-btn'>No</button>
          </div>
        </body>
      </div>
    </div>
  `;

  let target = document.getElementById('modal-window');
  target.className = 'modal-window';
  target.innerHTML = boxHTML;

  // when modal window is rendered, it is not immediately active
  // we activate it to animate into the window
  // using a delay of 1 seconds

  // activateModal();

  delay(100).then(() => activateModal());

  attachEventListeners();
}

const attachEventListeners = () => {
  let yesBtn = document.getElementById('yes-btn') || {};
  yesBtn.addEventListener('click', modalConfirmAction);

  let noBtn = document.getElementById('no-btn') || {};
  noBtn.addEventListener('click', modalCancelAction);

}

export default confirmModalBox;