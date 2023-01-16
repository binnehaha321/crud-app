import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
} from "../constants/authen";
import * as CK from "~/utils/cookies";

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
      CK.saveUserInfo(action.payload.userInfo);
      CK.saveLoginStatus();
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
      return {
        ...state,
        isLoading: true,
        msg: "",
      };
    }
    case LOG_OUT_SUCCESS: {
      CK.removeUserInfo();
      CK.removeLoginStatus();
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        userInfo: null,
      };
    }
    case LOG_OUT_FAIL: {
      return {
        ...state,
        isLoading: true,
        msg: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authenReducer;
