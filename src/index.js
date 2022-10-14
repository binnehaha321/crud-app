import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "~/store/reducers/rootReducer";

const reduxStore = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
