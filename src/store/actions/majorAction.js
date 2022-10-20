import {
  ADD_MAJOR,
  ADD_MAJOR_SUCCESS,
  ADD_MAJOR_FAIL,
} from "../constants/major";

export const addMajor = () => {
  return {
    type: ADD_MAJOR,
  };
};
export const addMajorSuccess = (payload) => {
  return {
    type: ADD_MAJOR_SUCCESS,
    payload,
  };
};
export const addMajorFail = (payload) => {
  return {
    type: ADD_MAJOR_FAIL,
    payload,
  };
};
