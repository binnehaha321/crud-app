import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./Layout/DefaultLayout";
import { cookies } from "./utils/cookies";

function App() {
  let { isLoading } = useSelector((state) => state.authen);
  let { msg, flag } = useSelector((state) => state.student);
  let isAuthen = cookies.get("user_info")?.token;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (flag) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }, [msg, flag]);

  useEffect(() => {
    if (!isAuthen && location.pathname === "/") navigate("sign-in");
    if (isLoading) return <Spin />;
  }, [location, navigate, isLoading, isAuthen]);

  return (
    <>
      {isAuthen ? (
        <Routes>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<DefaultLayout>{route.component}</DefaultLayout>}
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
    </>
  );
}

export default App;
