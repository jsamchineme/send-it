import delay from "../../services/utils/delay";

export const closeModal = () => {
  let modalWindow = document.getElementById('modal-window');
  modalWindow.className = 'modal-view'; // reset to initial state
}

export const activateModal = () => {
  let modalWindow = document.getElementById('modal-window');
  modalWindow.className = 'modal-view active';
}

const mapModalBox = ({title, origin, destination}) => {
  let boxHTML =`
    <div class='map-modal'>
      <div class='box'>
        <header>
          <div class='title'>${title}</div>
          <div class='actions'>
            <button class='btn confirm-modal-btn' id='direction-btn'>View Directions</button>
          </div>
        </header>
        <body>
          
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
  console.log('yesBtn', yesBtn);
  yesBtn.addEventListener('click', modalConfirmAction);

  let noBtn = document.getElementById('no-btn') || {};
  console.log('noBtn', noBtn);
  noBtn.addEventListener('click', modalCancelAction);

}

export default mapModalBox;