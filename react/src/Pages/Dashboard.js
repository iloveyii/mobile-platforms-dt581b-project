import React, {useEffect} from "react";
import {BrowserRouter} from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import { useSnackbar } from 'notistack';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Users from "../components/Users";
import Errors from "../components/Errors";
import models from '../store/models';



const drawerWidth = 240;

const useStyles = makeStyles(theme=>({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
}));

function Dashboard(props) {
  const errors = [
    {type: 'danger', msg: 'Error 1'},
    {type: 'info', msg: 'Error 2'},
    {type: 'warning', msg: 'Error 3'},
    {type: 'success', msg: 'Error 4'},
  ];
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {users, logins} = props;
  const usersResponses = models.users.errors(users.actions);
  const loginsResponses = models.users.errors(logins.actions);

  useEffect(() => {
    usersResponses.map(res =>   enqueueSnackbar(res.errors[0].msg + ' - ' + res.type , {variant: 'error'}) );
  }, [usersResponses]);

  useEffect(() => {
    loginsResponses.map(res =>   enqueueSnackbar(res.errors[0].msg + ' - ' + res.type , {variant: 'error'}) );
  }, [loginsResponses]);


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


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users,
    logins: state.logins
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Dashboard));
