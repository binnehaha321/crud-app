import { combineReducers } from "redux";
import authenReducer from "./authenReducer";
import studentReducer from "./studentReducer";
import majorReducer from "./majorReducer";
import paymentReducer from "./paymentReducer";
import userReducer from "./userReduce";
import paginationReducer from "./paginationReducer";

export default combineReducers({
  authen: authenReducer,
  user: userReducer,
  student: studentReducer,
  major: majorReducer,
  payment: paymentReducer,
  pagination: paginationReducer,
});
