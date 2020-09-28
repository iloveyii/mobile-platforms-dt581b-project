import React from "react";
import {BrowserRouter} from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Users from "../components/Users";


const drawerWidth = 240;

const useStyles = makeStyles(theme=>({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
}));

function Dashboard() {
  const classes = useStyles();

  return (
      <div className={classes.main}>
        <Header />
        <PageHeader
          title="SDG Goals"
          subtitle="There are 17 SDG goals"
          imageUrl="/images/good-health-and-well-being-sdg.jpg"
        />
        <Users />
      </div>
  );
}

export default Dashboard;
