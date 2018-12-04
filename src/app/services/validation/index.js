import validate, { inputValid } from './validator';
import * as rules from './rules';

const validation = (action, input) => {
  // prepare error key based on the action eg. userSignup 
  const errorKey = `${action}Errors`;
  
  // prepare validation rules based on the action
  let actionValidationRules = rules[`${action}Rules`];

  if(actionValidationRules) {
    // an array of errors containing error messages for each validated field
    let errorBag = validate(input, actionValidationRules);
    
    // fetch the fields that were validated
    let validatedFields = Object.keys(actionValidationRules);
    
    // check to see if all rules were passed, flag that request can proceed
    let canProceed = inputValid(errorBag, validatedFields);
    
    // put the validation results in the window.app.store namespace
    window.app.store[errorKey] = errorBag;
    window.app.store[`${action}CanProceed`] = canProceed;

    // console.log(errorBag);
    const errorBox  = document.getElementById('email-error-box');
    errorBox.innerHTML = errorBag['email'][0];

    // TODO
    // Try to use the window.app.setState() to update form input values and error messages
    console.log('Error Container', errorBox);
    console.log('ErrorBag', errorBag);
  }


}

export default validation;