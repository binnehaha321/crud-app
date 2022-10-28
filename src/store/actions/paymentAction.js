import {
  ADD_PAYMENT,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAIL,
} from "../constants/payment";

export const addPayment = () => {
  return {
    type: ADD_PAYMENT,
  };
};
export const addPaymentSuccess = (payload) => {
  return {
    type: ADD_PAYMENT_SUCCESS,
    payload,
  };
};
export const addPaymentFail = (payload) => {
  return {
    type: ADD_PAYMENT_FAIL,
    payload,
  };
};
