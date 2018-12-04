const retrieveAuthUser = () => {
  var user = JSON.parse(localStorage.getItem('authUser'));
  return user;
}

const persistAuthUser = (data) => {
  localStorage.setItem('authUser', JSON.stringify(data));
}


export {
  retrieveAuthUser,
  persistAuthUser
};