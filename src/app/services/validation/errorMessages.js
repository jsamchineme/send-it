
// server-side error messages
export const errorMessages = {
  credentialsNotFound: "Wrong credentials used. Please check that you are using the appropriate email and password",
  unknown: "There seems to an error with your login. Please check your internet connection",
  badInput: "Please enter valid email and password",
  required: "Please this field is required",
  badSignupInput: "Please fill all required fields",
  usedEmail: "The email has already been used",
}

export const computeMessage = (rule, substring) => {
  let message = "";
  var substring = substring.replace(/_id/g, ""); // replace the "_id" portion of anything_id eg institution_id to an empty "" string
  if(substring === 'programme_type') {
    substring = 'programme type';    
  }

  var substring = substring.replace("_"," ");

  switch(rule.name) {
    case 'required': 
      message = "Please provide the " + substring;
      break;
    case 'max': 
      message = "The " + substring + " should not be more than " + rule.ruleValue + " characters";
      break;
    case 'min': 
      message = "The " + substring + " should not be less than " + rule.ruleValue + " characters";
      break;
    case 'email': 
      message = "Please provide a valid email";
      break;
    default:
      message = rule.name;
  }
  return message;
}