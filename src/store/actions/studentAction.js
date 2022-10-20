import * as student from "../constants/student";

// ADD
export const addStudent = (payload) => {
  return {
    type: student.ADD_STUDENT,
    payload,
  };
};
export const addStudentSuccess = (payload) => {
  return {
    type: student.ADD_STUDENT_SUCCESS,
    payload,
  };
};
export const addStudentFail = (payload) => {
  return {
    type: student.ADD_STUDENT_FAIL,
    payload,
  };
};

// UPDATE
export const updateStudent = (payload) => {
  return {
    type: student.UPDATE_STUDENT,
    payload,
  };
};
export const updateStudentSuccess = (payload) => {
  return {
    type: student.UPDATE_STUDENT_SUCCESS,
    payload,
  };
};
export const updateStudentFail = (payload) => {
  return {
    type: student.UPDATE_STUDENT_FAIL,
    payload,
  };
};

// DELETE
export const deleteStudent = (payload) => {
  return {
    type: student.DELETE_STUDENT,
    payload,
  };
};
export const deleteStudentSuccess = (payload) => {
  return {
    type: student.DELETE_STUDENT_SUCCESS,
    payload,
  };
};
export const deleteStudentFail = (payload) => {
  return {
    type: student.DELETE_STUDENT_FAIL,
    payload,
  };
};
