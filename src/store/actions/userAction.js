import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/user";

// add
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

// update
export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};
export const updateUserSuccess = (payload) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};
export const updateUserFail = (payload) => {
  return {
    type: UPDATE_USER_FAIL,
    payload,
  };
};

// delete
export const deleteUser = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};
export const deleteUserSuccess = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};
export const deleteUserFail = (payload) => {
  return {
    type: DELETE_USER_FAIL,
    payload,
  };
};
