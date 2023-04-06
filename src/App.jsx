import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./Layout/DefaultLayout";
import Loading from "./components/Loading/Loading";
import ProtectedLayout from "./Layout/ProtectedLayout";

function App() {
  let { flag } = useSelector((state) => state.authen);
  let { msg } = useSelector((state) => state.student);

  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, [msg, flag]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedLayout><DefaultLayout>{route.component}</DefaultLayout></ProtectedLayout>}
            exact={route.exact}
            index={route.index}
          />
        ))}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
      </Routes>
    </Suspense>
  );
}

export default App;
