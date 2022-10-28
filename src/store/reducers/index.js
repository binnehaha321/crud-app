import { combineReducers } from "redux";
import authenReducer from "./authenReducer";
import studentReducer from "./studentReducer";
import majorReducer from "./majorReducer";
import userReducer from "./userReducer";
import paymentReducer from "./paymentReducer";

// const rootReducer = (state, action) => {
//   switch (action.type) {

//     case "SIGN_IN_SUCCESS": {
//       return { ...state, isLogin: true };
//     }
//     case "SIGN_IN_FAIL": {
//       return { ...state, isLogin: false };
//     }

//     case "ADD_USER":
//       request
//         .post("register", action.payload)
//         .then((res) => {
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => toast.error(err.message));
//       return { ...state };
//     case "ADD_STUDENT":
//       request
//         .post("students/add", action.payload)
//         .then((res) => {
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => toast.error(err.message));
//       return { ...state };
//     case "ADD_MAJOR":
//       request
//         .post("majors/add", action.payload)
//         .then((res) => {
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => toast.error(err.message));
//       return { ...state };
//     case "ADD_PAYMENT":
//       request
//         .post("payments/add", action.payload)
//         .then((res) => {
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => toast.error(err.message));
//       return { ...state };

//     default:
//       return state;
//   }
// };

// export default rootReducer;
export default combineReducers({
  authen: authenReducer,
  student: studentReducer,
  major: majorReducer,
  user: userReducer,
  payment: paymentReducer,
});
