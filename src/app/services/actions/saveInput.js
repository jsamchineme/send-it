import validate from '../../services/validation';

const saveInput = (action, e) => {
  console.log(action);
  const field = e.target.name;
  const value = e.target.value;

  // prepare the data
  const data = `${action}Data`;
  const input = window.app.store[data] || {};

  //update input field
  input[field] = value;

  // store the data in the window
  window.app.store[data] = input;
  
  // validate the input and save 
  validate(action, input);

}

export default saveInput;