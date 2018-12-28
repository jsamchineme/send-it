/**
 * This add a loading text or gif image to the submit button
 */
const showLoading = ({ actionBox }) => {
  const loadingText = 'Processing...';
  actionBox.innerHTML = loadingText;
  actionBox.classList.add('pending');
}

export default showLoading;