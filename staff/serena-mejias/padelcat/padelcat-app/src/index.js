import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import padelcatApi from "./padelcat-api";

const { REACT_APP_API_URL } = process.env

padelcatApi.setUpDefaults(REACT_APP_API_URL);

//ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
