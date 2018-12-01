
const getUserToken = () => {
  const authUser = retrieveAuthUser();
  let token = 'xxxx';
  if(authUser) {
    token = authUser.token;
  }
  return token;
};

const retrieveAuthUser = () => {
  var user = JSON.parse(localStorage.getItem('authUser'));
  return user;
}

const persistAuthUser = (data) => {
  localStorage.setItem('authUser', JSON.stringify(data));
}


export {
  getUserToken,
  retrieveAuthUser,
  persistAuthUser
};