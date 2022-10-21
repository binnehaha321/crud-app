import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
} from "../constants/user";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: true,
      };
    }
    case ADD_USER_FAIL: {
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

export default userReducer;
