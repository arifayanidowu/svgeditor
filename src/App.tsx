import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./App.css";
import theme from "./theme";
import Drawing from "./components/Drawing";

function App() {
  return (
   <MuiThemeProvider theme={theme}>
     <CssBaseline />
     <Drawing />
   </MuiThemeProvider>
  );
}

export default App;
