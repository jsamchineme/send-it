import ResponseException from './ResponseException';

// const BASE_URL = 'https://johnnysam-sendit.herokuapp.com/api/v1';
const BASE_URL = 'http://localhost:8001/api/v1';


export const getParcels = (token) => {
  return fetch(`${BASE_URL}/parcels?token=${token}`)
  .then(res => { 
    if(!res.ok) {
      throw new ResponseException(res);
    }
    return res.json();
  });
}

export const userLogin = (data) => {
  return fetch(`${BASE_URL}/auth/login`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  });
};

export const userSignup = (data) => {
  return fetch(`${BASE_URL}/auth/signup`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(res => { 
    if(!res.ok) {
      throw new ResponseException(res);
    }
    return res.json();
  })
};


// postFile('https://appdividend.com/api/v1/users', 'input[type="file"].avatar')
//   .then(data => console.log(data))
//   .catch(error => console.error(error))

// function postFile(url, fileSelector) {
//   const formData = new FormData()
//   const fileField = document.querySelector(fileSelector)
  
//   formData.append('username', 'abc123')
//   formData.append('avatar', fileField.files[0])

//   return fetch(url, {
//     method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
//     body: formData  // Coordinate the body type with 'Content-Type'
//   })
//   .then(res => res.json())
// }