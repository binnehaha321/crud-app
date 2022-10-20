import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, LOG_OUT } from "../constants/authen";

const initialState = {
  isLoading: false,
  isLogin: false,
  msg: null,
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
      localStorage.setItem(
        "user_info",
        JSON.stringify(action.payload.userInfo)
      );
      localStorage.setItem("is_login", true);
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        msg: action.payload,
        userInfo: action.payload.userInfo,
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        msg: action.payload,
      };
    }
    case LOG_OUT: {
      localStorage.removeItem("user_info")
      localStorage.removeItem("is_login");
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        msg: action.payload,
        userInfo: null,
      };
    }
    default:
      return state;
  }
};

export default authenReducer;
