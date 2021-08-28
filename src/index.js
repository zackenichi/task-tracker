import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TaskContextProvider } from './context/task-context'

ReactDOM.render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
