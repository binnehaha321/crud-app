import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./Layout/DefaultLayout";
import { cookies } from "./utils/cookies";
import Loading from "./components/Loading/Loading";
import SignIn from "./Pages/SignIn";

function App() {
  let { flag } = useSelector((state) => state.authen);
  let { msg } = useSelector((state) => state.student);
  let userInfo = cookies.get("user_info");
  let token = userInfo?.token;

  let isAdmin = userInfo?.roles?.some((role) => role === "ROLE_ADMIN");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, [msg, flag]);

  useEffect(() => {
    if (!token && location.pathname === "/") {
      navigate("/sign-in");
    }
  }, [location, navigate, token]);

  return (
    <Suspense fallback={<Loading />}>
      {token ? (
        <Routes>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<DefaultLayout>{route.component}</DefaultLayout>}
              exact={route.exact}
              index={route.index}
            />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
