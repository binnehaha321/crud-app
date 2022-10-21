import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
} from "../constants/user";

export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
export const addUserSuccess = (payload) => {
  return {
    type: ADD_USER_SUCCESS,
    payload,
  };
};
export const addUserFail = (payload) => {
  return {
    type: ADD_USER_FAIL,
    payload,
  };
};
