import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
