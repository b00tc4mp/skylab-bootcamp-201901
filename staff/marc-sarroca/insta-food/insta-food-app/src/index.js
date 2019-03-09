import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import { HashRouter } from "react-router-dom";
import logic from "./logic";

Object.defineProperties(logic, {
  __userId__: {
    set(id) {
      sessionStorage.setItem("__userId__", id);
    },

    get() {
      return sessionStorage.getItem("__userId__");
    }
  },

  __userApiToken__: {
    set(token) {
      sessionStorage.setItem("__userApiToken__", token);
    },

    get() {
      return sessionStorage.getItem("__userApiToken__");
    }
  }
});

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
