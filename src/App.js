import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd"; 
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./Layout/DefaultLayout";
import { cookies } from "./utils/cookies";

function App() {
  let { isLoading } = useSelector((state) => state.authen);
  let isAuthen = cookies.get("is_login");
  const navigate = useNavigate();
  const location = useLocation();

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
