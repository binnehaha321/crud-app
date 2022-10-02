import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="sign-in" element={<SignIn />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
