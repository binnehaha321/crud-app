import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  LOG_OUT,
} from "../constants/authen";
import * as LS from "~/utils/localStorage";

const initialState = {
  isLoading: false,
  msg: null,
  flag: false,
  userInfo: null,
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGN_IN_SUCCESS: {
      LS.saveUserInfo(action.payload.userInfo);
      LS.saveLoginStatus();
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
        flag: true,
        userInfo: action.payload.userInfo,
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        isLoading: false,
        flag: false,
        msg: action.payload,
      };
    }
    case LOG_OUT: {
      LS.removeUserInfo();
      LS.removeLoginStatus();
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        userInfo: null,
      };
    }
    default:
      return state;
  }
};

export default authenReducer;
