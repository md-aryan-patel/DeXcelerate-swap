import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApplicationProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApplicationProvider>
  </BrowserRouter>
);

reportWebVitals();
