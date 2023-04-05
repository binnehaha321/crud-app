import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./Layout/DefaultLayout";
import Loading from "./components/Loading/Loading";
import { getToken } from "./utils/request";

function App() {
  let { flag } = useSelector((state) => state.authen);
  let { msg } = useSelector((state) => state.student);
  let token = getToken();

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
