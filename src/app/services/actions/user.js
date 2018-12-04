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

    console.log('--Auth User--', savedAuthUser);

  }).catch(async error => {
    let message = await error.getMessage();
    console.log("---ERROR", message);
    // TODO:
    // show some feedback on the user interface
  });
}

export const adminLogin = (e) => {
  e.preventDefault();
  const data = window.app.store.adminLoginData;

  api.userLogin(data).then(response => {
    window.app.store.authUser = response.data;

    const authUser = response.data;
    
    persistAuthUser(authUser);
    
    const savedAuthUser = retrieveAuthUser();

    console.log('--Auth User--', savedAuthUser);
  }).catch(error => {
    // let message = await error.getMessage();
    console.log("---ERROR", error.status);
    // TODO:
    // show some feedback on the user interface
  });
}

export const userSignup = (e) => {
  e.preventDefault();
  const data = window.app.store.userSignupData;

  api.userSignup(data).then(response => {
    window.app.store.authUser = response.data;
    console.log(response);
  }).catch(error => {
    console.log("---ERROR", error.message);
    // TODO:
    // show some feedback on the user interface
  });
}