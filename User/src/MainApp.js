import React from "react";
import { Provider } from "react-redux";

import configureStore from "./store";
import "./firebase/firebase";
import App from "./containers/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const store = configureStore();

const MainApp = () => (
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <App />
  </Provider>
);

export default MainApp;
