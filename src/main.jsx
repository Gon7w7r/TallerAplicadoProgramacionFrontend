import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { InscripcionProvider } from "./context/InscripcionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InscripcionProvider>
        <App />
      </InscripcionProvider>
    </BrowserRouter>
  </React.StrictMode>
);