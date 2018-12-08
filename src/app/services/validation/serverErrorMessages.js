
// server-side error messages
const preparedMessages = {
  credentialsNotFound: "Wrong credentials used. Please check that you are using the appropriate email and password",
  unknown: "There seems to an error with your login. Please check your internet connection",
  badLoginInput: "Please enter valid email and password",
  required: "Please this field is required",
  badSignupInput: "Please fill all required fields",
  allRequired: "Please provide the details as required",
  usedEmail: "The email has already been used",
  usedUsername: "The username has already been used",
}

export const computeMessage = (serverMessage, responseStatus = null) => {
  let message;
  
  switch(responseStatus) {
    case 422: 
      switch(serverMessage) {
        case '\"password\" must only contain alpha-numeric characters': 
          message = serverMessage; break;
        case '\"firstname\" must only contain alpha-numeric characters': 
          message = serverMessage; break;
        case '\"lastname\" must only contain alpha-numeric characters':
          message = serverMessage; break;
        case '\"username\" must only contain alpha-numeric characters': 
          message = serverMessage; break;
        default: 
          message = serverMessage;
      }
      break;
    case 409:
      switch(serverMessage) {
        case 'email already exists': 
          message = preparedMessages['usedEmail']; break;
        case 'username already exists': 
          message = preparedMessages['usedUsername']; break;
        default:
          message = serverMessage;
      }
      break;
    case 401: 
      switch(serverMessage) {
        case 'Provide correct login credentials': 
          message = preparedMessages['badLoginInput']; break;
        case 'username already exists': 
          message = preparedMessages['usedUsername']; break;
        default:
          message = serverMessage;
      }
      break;
    default: message = preparedMessages['unknown'];
  }


  return message;
}