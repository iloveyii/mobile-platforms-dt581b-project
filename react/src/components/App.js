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
import PageHeader from "./PageHeader";
import Users from "./Users";

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
  spacing: 10
});

const drawerWidth = 240;

const useStyles = makeStyles({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    flexGrow: 1
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <Header />
        <PageHeader
          title="SDG Goals"
          subtitle="There are 17 SDG goals"
          imageUrl="/images/good-health-and-well-being-sdg.jpg"
        />
        <Users />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
