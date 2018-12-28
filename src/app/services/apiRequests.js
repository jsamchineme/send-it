import ResponseException from './ResponseException';

const BASE_URL = process.env.NODE_ENV === 'development' ?
  'http://localhost:8001/api/v1' :
  'https://johnnysam-sendit.herokuapp.com/api/v1';
  
  // 'http://192.168.43.91:8001/api/v1' :
  // 'http://172.20.10.2:8001/api/v1' :

export const getParcels = (data) => {
  return fetch(`${BASE_URL}/parcels?token=${data.token}`)
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  });
}

export const getUserParcels = (data) => {
  return fetch(`${BASE_URL}/users/${data.userId}/parcels?token=${data.token}`)
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  });
}

export const fetchAParcel = (data) => {
  return fetch(`${BASE_URL}/parcels/${data.parcelId}?token=${data.token}`)
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
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
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const refreshToken = (data) => {
  return fetch(`${BASE_URL}/auth/refresh`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': data.token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const cancelOrder = (data) => {
  return fetch(`${BASE_URL}/parcels/${data.parcelId}/cancel`, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': data.token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const editDestination = (data, parcelId, token) => {
  return fetch(`${BASE_URL}/parcels/${parcelId}/destination`, {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const changeStatus = (data, parcelId, token) => {
  return fetch(`${BASE_URL}/parcels/${parcelId}/status`, {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const editPresentLocation = (data, parcelId, token) => {
  return fetch(`${BASE_URL}/parcels/${parcelId}/presentLocation`, {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const requestPasswordReset = (data) => {
  return fetch(`${BASE_URL}/auth/reset`, {
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
  })
};

export const changePassword = (data, token) => {
  return fetch(`${BASE_URL}/auth/reset`, {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
    }
    return res.json();
  })
};

export const createOrder = (data, token) => {
  return fetch(`${BASE_URL}/parcels`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token,
    }),
  })
  .then(async res => { 
    if(!res.ok) {
      throw await ResponseException.prepare(res);
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