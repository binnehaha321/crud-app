import React from "react";
import ReactDOM from "react-dom/client";
// import "antd/dist/antd.min.css";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import configStore from "./store/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configStore();
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f8d442",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
