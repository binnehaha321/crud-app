import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./Layout/DefaultLayout";
import { cookies } from "./utils/cookies";

function App() {
  let { isLoading } = useSelector((state) => state.authen);
  let { msg, flag } = useSelector((state) => state.student);
  let isAuthen = cookies.get("user_info")?.data.token;
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

  useEffect(() => {
    if (isAuthen) {
      const decoded = jwt_decode(isAuthen);
      const currentTime = Date.now() / 1000;
      // check if token is expired
      if (decoded.exp < currentTime) {
        // remove token from local storage
        cookies.remove("is_login");
        // redirect to login page
        navigate("/sign-in");
      }
    } else {
      // redirect to login page if token does not exist
      navigate("/sign-in");
    }
  }, [isAuthen, navigate]);

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
