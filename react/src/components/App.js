import React from "react";
import {BrowserRouter} from 'react-router-dom';
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { teal } from "@material-ui/core/colors";
import PageHeader from "./PageHeader";
import Users from "./Users";
import Dashboard from '../Pages/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
      light: "#33ab9f",
      dark: "#00695f"
    },
    secondary: {
      dark: "#27632a",
      main: "#388e3c",
      light: "#5fa463"
    },
    background: {
      default: "#FFF" // teal[50]
    }
  },
  shape: {
    borderRadius: 3
  },
  spacing: 8
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
