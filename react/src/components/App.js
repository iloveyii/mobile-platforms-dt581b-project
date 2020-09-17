import React from "react";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { teal } from "@material-ui/core/colors";

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
      default: teal[50]
    }
  },
  shape: {
    borderRadius: 0
  },
  spacing: 10,
  
});

const useStyles = makeStyles({
  main: {
    paddingLeft: "320px",
    width: "100%"
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <div className={classes.main}>
        <Header />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
