const retrieveAuthUser = () => {
  var user = JSON.parse(localStorage.getItem('authUser'));
  return user;
}

const persistAuthUser = (data) => {
  if(data) {
    localStorage.setItem('authUser', JSON.stringify(data));
  }
}

const clearAuthUser = () => {
  localStorage.removeItem('authUser');
}

export {
  retrieveAuthUser,
  persistAuthUser,
  clearAuthUser
};