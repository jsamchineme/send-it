import validate, { inputValid } from './validator';
import * as rules from './rules';

/**
 * This Service handles all form input validation
 * including DOM rendering of error messagges
 *  
 * @export 
 * @class Validation
 */
class Validation {
  /**
   * Validate all input for all action
   * e.g userSignup, userLogin etc
   * 
   * @param {String} action - the description of the current form action 
   * @param {Object} input - object of fields: values supplied
   */
  static validate(action, input, currentField) {
    // prepare error key based on the action eg. userSignup 
    const errorKey = `${action}Errors`;
    
    // prepare validation rules based on the action
    let actionValidationRules = rules[`${action}Rules`];
  
    if (actionValidationRules) {
      // an array of errors containing error messages for each validated field
      let errorBag = validate(input, actionValidationRules);
      
      // fetch the fields that were validated
      let validatedFields = Object.keys(actionValidationRules);
      
      // check to see if all rules were passed, flag that request can proceed
      let canProceed = inputValid(errorBag, validatedFields, actionValidationRules);
      
      // put the validation results in the window.app.store namespace
      window.app.store[errorKey] = errorBag;
      window.app.store[`${action}CanProceed`] = canProceed;
  
      Validation.renderValidationReports(
        validatedFields, 
        actionValidationRules, 
        errorBag,
        currentField,
        input
      );
    }
  }

  /**
   * Check if the field has a "required" rule specified
   * @param {String} field - name of the field
   * @param {Array} rules - list of rules for the field
   */
  static fieldHasRequired(field, rules) {
    const fieldRules = rules[field];
    return fieldRules.find(t => t.name === 'required');
  }

  /**
   * Render all validation reports/message to the appropriate
   * placeholders in the DOM for all validated fields
   * 
   * @param {Array} fields - list of fields
   * @param {Array} rules - Array of rules (objects) for each field
   */
  static renderValidationReports(fields, rules, errorBag, currentField, input) {
    fields.forEach(field => {
      const errorBox  = document.getElementById(`${field}-error-box`);
      const fieldErrors = errorBag[field] || [];
      const errorMessage = fieldErrors[0] || '';
      const fieldIsRequired = Validation.fieldHasRequired(field, rules);

      if (!fieldIsRequired) {
        // show error alerts for unrequired field only when there are inputs
        // available in the input box
        const fieldValue = input[field] || '';
        if (fieldValue.length > 0) {
          Validation.showMessages(errorMessage, errorBox);
        }
        // if the field is the currently active form field
        // and it has no value
        // clearMessage over a timeout
        if(currentField === field && fieldValue.length === 0) {
          Validation.clearMessage(field, errorBox, errorBag, input, fields, rules);
        }
      } else {
        Validation.showMessages(errorMessage, errorBox);
      }
    });
  }

  static showMessages(errorMessage, errorBox) {
    // on addition of active class the box animates in to the reveal the message
    errorMessage ? errorBox.className = 'error-box active' : errorBox.className = 'error-box';
    // render the message to the error-box
    errorBox ? errorBox.innerHTML = errorMessage : null;
  }

  static clearMessage(
    field, 
    errorBox, 
    errorBag, 
    input, 
    validatedFields, 
    actionValidationRules
  ) {
    // start the delay that resolves over 5 minutes to
    // to hide the message box

    clearTimeout(Validation[`${field}HideTimeout`]);

    Validation[`${field}HideTimeout`] = setTimeout(() => {
      // remove the error from the box
      errorBox.innerHTML = '';
      // remove the errors for the unrequired field from the errorBag
      // so that the user is not forced to provide value for fields 
      // that are not required
      errorBag[field] = [];

      // re-evaluate final validation
      inputValid(errorBag, validatedFields, actionValidationRules);

      // also remove it from the data to be sent 
      // so that they are not contained in the request hitting the api
      delete input[field];

      // restore box to initial where it is hidden by default
      errorBox.className = 'error-box';
    }, 2000);
  }
}

const showMessages = Validation.showMessages;

export {
  showMessages
}

export default Validation;