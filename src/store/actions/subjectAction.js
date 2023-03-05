import { ADD_SUBJECT_SUCCESS, ADD_SUBJECT_FAIL } from "../constants/subject";

export const addSubjectSuccess = (payload) => {
  return {
    type: ADD_SUBJECT_SUCCESS,
    payload,
  };
};
export const addSubjectFail = (payload) => {
  return {
    type: ADD_SUBJECT_FAIL,
    payload,
  };
};
