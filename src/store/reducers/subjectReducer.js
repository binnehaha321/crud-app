import { ADD_SUBJECT_SUCCESS, ADD_SUBJECT_FAIL } from "../constants/subject";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: true,
      };
    }
    case ADD_SUBJECT_FAIL: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: false,
      };
    }
    default:
      return state;
  }
};

export default subjectReducer;
