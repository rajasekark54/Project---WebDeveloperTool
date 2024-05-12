/* global chrome */
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { Store } from "webext-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const proxyStore = new Store();
proxyStore.ready().then(() => {
  ReactDOM.render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
