import {
  ADD_PAYMENT,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAIL,
} from "../constants/payment";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAYMENT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ADD_PAYMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        flag: true,
      };
    }
    case ADD_PAYMENT_FAIL: {
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

export default paymentReducer;
