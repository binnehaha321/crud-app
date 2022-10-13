import SignIn from "~/components/Pages/SignIn";
import Home from "~/components/Pages/Home";
import Payment from "~/components/Pages/Payment";
import StudentList from "~/components/Pages/Student/StudentList";
import AddNewStudent from "~/components/Pages/Student/AddNewStudent";
import UserList from "~/components/Pages/User/UserList";
import AddNewUser from "~/components/Pages/User/AddNewUser";
import NotFound from "~/components/Pages/NotFound";

const publicRoutes = [{ path: "/sign-in", component: <SignIn /> }];
const privateRoutes = [
  { path: "/", component: <Home /> },
  { path: "payment", component: <Payment /> },
  { path: "students", component: <StudentList /> },
  { path: "students/add", component: <AddNewStudent /> },
  { path: "users", component: <UserList /> },
  { path: "users/add", component: <AddNewUser /> },
  { path: "*", component: <NotFound /> },
];

export { publicRoutes, privateRoutes };
