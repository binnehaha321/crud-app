import SignIn from "~/components/Pages/SignIn";
import Home from "~/components/Pages/Home";
import Payment from "~/components/Pages/Payment";
import StudentList from "~/components/Pages/Student/StudentList";
import AddNewStudent from "~/components/Pages/Student/AddNewStudent";
import UserList from "~/components/Pages/User/UserList";
import AddNewUser from "~/components/Pages/User/AddNewUser";
import MajorList from "~/components/Pages/Major/MajorList";
import AddNewMajor from "~/components/Pages/Major/AddNewMajor";
import ResetPassword from "~/components/Pages/ResetPassword";
import ConfirmPassword from "~/components/Pages/ConfirmPassword";
import NotFound from "~/components/Pages/NotFound";

const publicRoutes = [
  { path: "/sign-in", component: <SignIn /> },
  { path: "reset-password", component: <ResetPassword /> },
  { path: "confirm-password", component: <ConfirmPassword /> },
];
const privateRoutes = [
  { path: "/", component: <Home /> },
  { path: "payment", component: <Payment /> },
  { path: "students", component: <StudentList /> },
  { path: "students/add", component: <AddNewStudent /> },
  { path: "users", component: <UserList /> },
  { path: "users/add", component: <AddNewUser /> },
  { path: "majors", component: <MajorList /> },
  { path: "majors/add", component: <AddNewMajor /> },
  { path: "*", component: <NotFound /> },
];

export { publicRoutes, privateRoutes };
