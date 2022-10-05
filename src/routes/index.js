import SignIn from "~/components/Pages/SignIn";
import Home from "~/components/Pages/Home";
import Payment from "~/components/Pages/Payment";
import StudentList from "~/components/Pages/StudentList";
import NotFound from "~/components/Pages/NotFound";

const publicRoutes = [{ path: "/sign-in", component: <SignIn /> }];
const privateRoutes = [
  { path: "/", component: <Home /> },
  { path: "/payment", component: <Payment /> },
  { path: "/student-list", component: <StudentList /> },
  { path: "*", component: <NotFound /> },
];

export { publicRoutes, privateRoutes };
