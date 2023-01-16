import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAIL } from "../constants/authen";

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
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
export const logOutSuccess = (payload) => {
  return {
    type: LOG_OUT_SUCCESS,
    payload,
  };
};
export const logOutFail = (payload) => {
  return {
    type: LOG_OUT_FAIL,
    payload,
  };
};
