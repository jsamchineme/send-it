
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

export const inputValid = (errorBag, fields) => {
  // we return false if for all fields, errors are empty
  let emptyFieldsCount = 0;
  for (let i = 0; i < fields.length; i++) {

    if (errorBag.hasOwnProperty(fields[i]) && errorBag[fields[i]].length === 0) {
      emptyFieldsCount = emptyFieldsCount + 1;
    }
  }

  if (emptyFieldsCount === fields.length) {
    return true;
  }

  return false;
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