import React from "react";
import ReactDOM from "react-dom";
import { Spinner } from "./common/components";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <App />
    <Spinner />
  </div>,
  rootElement
);
