import { ADD_SCORE_SUCCESS, ADD_SCORE_FAIL } from "../constants/score";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCORE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: true,
      };
    }
    case ADD_SCORE_FAIL: {
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

export default scoreReducer;
