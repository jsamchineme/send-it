const BASE_URL = 'https://johnnysam-sendit.herokuapp.com/api/v1';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYW1jb3RlY2hAZXhhbXBsZS5pbyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU0MzUwNDE2NSwiZXhwIjoxNTQzNTA3NzY1fQ.nshzGVn7h-AQjvDIvMENyhc6HrILbUHHV7FiahGlZbQ';
 
export const getParcels = () => {
  return fetch(`${BASE_URL}/parcels?${adminToken}`)
  .then(res => res.json()); // set response type
}

export const userSignup = (data) => {
  return fetch(`${BASE_URL}/auth/signup`, data);
}


function postRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => response.json())
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
//   .then(response => response.json())
// }