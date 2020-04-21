import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

// import * as Sentry from "@sentry/browser";

// Sentry.init({
//   dsn:
//     "https://b82f552a1e784a0c9aad1cff56550c39@o380758.ingest.sentry.io/5207060",
// });
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
