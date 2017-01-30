import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from './ActionTypes';

/* LOGIN */
export function loginRequest(password1, password2) {
  return (dispatch) => {
    dispatch(login());
    return axios.post('api/account/signin', { password1, password2 })
    .then((response) => {
      console.log("response!! "+JSON.stringify(response.data.username));
      dispatch(loginSuccess(response.data.username));
    }).catch((error) => {
      dispatch(loginFailure());
    });
  };
}

export function login(){
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}
