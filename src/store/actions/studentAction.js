import {
  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
} from "../constants/student";

// add
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

// update
export const updateStudent = () => {
  return {
    type: UPDATE_STUDENT,
  };
};
export const updateStudentSuccess = (payload) => {
  return {
    type: UPDATE_STUDENT_SUCCESS,
    payload,
  };
};
export const updateStudentFail = (payload) => {
  return {
    type: UPDATE_STUDENT_FAIL,
    payload,
  };
};

// delete
export const deleteStudent = () => {
  return {
    type: DELETE_STUDENT_SUCCESS,
  };
};
export const deleteStudentSuccess = (payload) => {
  return {
    type: DELETE_STUDENT,
    payload,
  };
};
export const deleteStudentFail = (payload) => {
  return {
    type: DELETE_STUDENT_FAIL,
    payload,
  };
};
