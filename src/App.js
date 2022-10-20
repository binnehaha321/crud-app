import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
import SignIn from "./components/Pages/SignIn";

function App() {
  let { isLoading } = useSelector((state) => state.authen);
  let isAuthen = localStorage.getItem("is_login");

  if (!isAuthen) return <SignIn />;
  if (isLoading) return <Spin />;

  return (
    <>
      {isAuthen && (
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<DefaultLayout>{route.component}</DefaultLayout>}
            />
          ))}
        </Routes>
      )}
    </>
  );
}

export default App;
