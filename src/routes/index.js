import SignIn from "~/Pages/SignIn";
import Home from "~/Pages/Home";
import Payment from "~/Pages/Payment/PaymentList";
import AddNewPayment from "~/Pages/Payment/AddNewPayment";
import PaymentDetail from "~/Pages/Payment/PaymentDetail";
import StudentList from "~/Pages/Student/StudentList";
import AddNewStudent from "~/Pages/Student/AddNewStudent";
import UserList from "~/Pages/User/UserList";
import AddNewUser from "~/Pages/User/AddNewUser";
import MajorList from "~/Pages/Major/MajorList";
import AddNewMajor from "~/Pages/Major/AddNewMajor";
import ResetPassword from "~/Pages/ResetPassword";
import ConfirmPassword from "~/Pages/ConfirmPassword";
import NotFound from "~/Pages/NotFound";

const publicRoutes = [
  { path: "sign-in", component: <SignIn /> },
  { path: "reset-password", component: <ResetPassword /> },
  { path: "confirm-password", component: <ConfirmPassword /> },
];
const privateRoutes = [
  { path: "/", component: <Home /> },
  { path: "payments", component: <Payment /> },
  { path: "payments/add", component: <AddNewPayment /> },
  { path: "payments/:id", component: <PaymentDetail /> },
  { path: "students", component: <StudentList /> },
  { path: "students/add", component: <AddNewStudent /> },
  { path: "users", component: <UserList /> },
  { path: "users/add", component: <AddNewUser /> },
  { path: "majors", component: <MajorList /> },
  { path: "majors/add", component: <AddNewMajor /> },
  { path: "*", component: <NotFound /> },
];

export { publicRoutes, privateRoutes };
