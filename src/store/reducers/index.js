import { combineReducers } from "redux";
import authenReducer from "./authenReducer";
import studentReducer from "./studentReducer";
import majorReducer from "./majorReducer";
import userReducer from "./userReduce";
import paginationReducer from "./paginationReducer";
import scoreReducer from "./scoreReducer";
import subjectReducer from "./subjectReducer";
import studentClassReducer from "./studentClassReducer";

export default combineReducers({
  authen: authenReducer,
  user: userReducer,
  student: studentReducer,
  major: majorReducer,
  pagination: paginationReducer,
  score: scoreReducer,
  subject: subjectReducer,
  studentClass: studentClassReducer,
});
