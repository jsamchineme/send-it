import * as api from '../apiRequests';
import { persistAuthUser, retrieveAuthUser } from "../localStorage";

export const userLogin = (e) => {
  e.preventDefault();
  const data = window.app.store.userLoginData;

  api.userLogin(data).then(response => {
    window.app.store.authUser = response.data;

    const authUser = response.data;
    
    persistAuthUser(authUser);
    
    const savedAuthUser = retrieveAuthUser();

  }).catch(error => {
    // console.log("---ERROR", error.status);
    // TODO:
    // show some feedback on the user interface
  });
}

export const userSignup = (e) => {
  const data = window.app.store.userSignupData;
  e.preventDefault();

  api.userSignup(data).then(response => {
    window.app.store.authUser = response.data;
    console.log(response);
  });
}