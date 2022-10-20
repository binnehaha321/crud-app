import {
  ADD_MAJOR,
  ADD_MAJOR_SUCCESS,
  ADD_MAJOR_FAIL,
} from "../constants/major";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
};

const majorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAJOR: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ADD_MAJOR_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: true,
      };
    }
    case ADD_MAJOR_FAIL: {
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

export default majorReducer;
