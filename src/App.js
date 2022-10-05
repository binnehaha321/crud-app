import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/routes";
import DefaultLayout from "./components/Layout/DefaultLayout";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
