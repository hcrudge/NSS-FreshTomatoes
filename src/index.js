import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Tomato } from "./components/Tomato";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Tomato />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
