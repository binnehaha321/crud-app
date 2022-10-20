import {
  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
} from "../constants/student";

// ADD
export const addStudent = () => {
  return {
    type: ADD_STUDENT,
  };
};
export const addStudentSuccess = (payload) => {
  return {
    type: ADD_STUDENT_SUCCESS,
    payload,
  };
};
export const addStudentFail = (payload) => {
  return {
    type: ADD_STUDENT_FAIL,
    payload,
  };
};
