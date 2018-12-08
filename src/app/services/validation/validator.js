
import {
  computeMessage
} from './errorMessages';

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const handleRule = (rule, inputName, inputValue, fieldErrors) => {
  switch (rule.name) {
    case 'required':
      if (inputValue === "") {
        return [...fieldErrors, computeMessage(rule, inputName)];
      }
      return fieldErrors;
    case 'max':
      if (inputValue.length > rule.ruleValue) {
        return [...fieldErrors, computeMessage(rule, inputName)]
      }
      return fieldErrors;
    case 'min':
      if (inputValue.length < rule.ruleValue) {
        return [...fieldErrors, computeMessage(rule, inputName)]
      }
      return fieldErrors;
    case 'email':
      if (!validateEmail(inputValue)) {

        return [...fieldErrors, computeMessage(rule, inputName)]
      }
      return fieldErrors;
    default:
      return fieldErrors;
  }
}

const validate = (data, rules) => {
  let errorBag = {};
  let fields = Object.keys(data);
  for (let i = 0; i < fields.length; i++) {

    let field = fields[i];
    let fieldValue = data[field];

    let fieldErrors = [];
    if (rules.hasOwnProperty(field)) {
      for (let j = 0; j < rules[field].length; j++) {
        let rule = rules[field][j];
        fieldErrors = handleRule(rule, field, fieldValue, fieldErrors);
      }
    }
    errorBag = {
      ...errorBag,
      [field]: fieldErrors
    };
  }

  return errorBag;
}

export const inputValid = (errorBag, fields, fieldRules) => {
  // we return false if for all fields, errors are empty
  let validFields = [];
  let canProceed = false;

  fields.forEach(field => {
    if (errorBag[field] !== undefined && errorBag[field].length === 0) {
      validFields.push(field);
    }
    // Add unrequired field to the list, if they are not provided 
    // checking that the field does not have the "required" rule
    const canAddUnrequired = errorBag[field] === undefined;

    if (canAddUnrequired) {
      if (!fieldRules[field].find(f => f.name === 'required')) {
        // check that the field is not already in the valid fields list
        if (!validFields.find(f => f === field)) {
          validFields.push(field);
        }
      }
    }
  });



  if (validFields.length === fields.length) {
    canProceed = true;
  }

  return canProceed;
}

export const errorsFound = (field, errors) => {
  let ascertion = false;
  if (errors && errors.hasOwnProperty(field)) {
    if (errors[field].length > 0) { // if the errors for a field is at least 1
      ascertion = true;
    }
  }
  return ascertion;
}

export default validate;