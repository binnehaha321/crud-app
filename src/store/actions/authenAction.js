import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, LOG_OUT } from "../constants/authen";

export const signIn = () => {
  return {
    type: SIGN_IN,
  };
};
export const signInSuccess = (payload) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
};
export const signInFail = (payload) => {
  return {
    type: SIGN_IN_FAIL,
    payload,
  };
};
export const logOut = (payload) => {
  return {
    type: LOG_OUT,
    payload,
  };
};
