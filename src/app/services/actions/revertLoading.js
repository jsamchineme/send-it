const revertLoading = ({ actionBox, normalText }) => {
  actionBox.innerHTML = normalText;
  actionBox.classList.remove('pending');
}

export default revertLoading;