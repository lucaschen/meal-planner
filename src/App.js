import React from "react";
import ReactDOM from "react-dom";

import Main from "./components/Main";

import { Provider } from "react-redux";

import reduxStore from "./reducers/allReducers";

ReactDOM.render(
  <Provider store={reduxStore}>
    <Main />
  </Provider>,
  document.getElementById("reactRoot")
);

if (process.env.NODE_ENV === "development") {
  module.hot.accept();
}
