import * as student from "../constants/student";

const initialState = {
  isLoading: false,
  msg: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case student.ADD_STUDENT: {
      return { ...state, isLoading: true };
    }
    case student.ADD_STUDENT_SUCCESS: {
      return { ...state, isLoading: false, msg: action.payload };
    }
    case student.ADD_STUDENT_FAIL: {
      return { ...state, isLoading: false, msg: action.payload };
    }
    default:
      return { ...state };
  }
};

export default studentReducer;
