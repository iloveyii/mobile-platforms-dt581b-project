import React, {useEffect} from "react";
import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import { useSnackbar } from 'notistack';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import {Header} from "../Layouts";
import PageHeader from "../components/PageHeader";
import Users from "../components/Users";
import Doors from "../components/Doors";
import Permissions from "../components/Permissions";
import Settings from "../components/Settings";
import Ni from "../components/Ni";
import Errors from "../components/Errors";
import models from '../store';


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
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {users, logins, doors} = props;
  const usersResponses = models.users.errors(users.actions);
  const loginsResponses = models.users.errors(logins.actions);
  const doorsResponses = models.doors.errors(doors.actions);

  useEffect(() => {
    // usersResponses.map(res =>   enqueueSnackbar(JSON.stringify(res.errors[0].msg) + ' - ' + res.type , {variant: res.errors[0].type}) );
    usersResponses.map(res =>   {
      const msg = (typeof res.errors[0].msg) === 'string' ? res.errors[0].msg : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, {variant: res.errors[0].type});
    } );
  }, [usersResponses]);

  useEffect(() => {
    loginsResponses.map(res =>   {
      const msg = (typeof res.errors[0].msg) === 'string' ? res.errors[0].msg : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, {variant: res.errors[0].type});
    } );
  }, [loginsResponses]);

  useEffect(() => {
    doorsResponses.map(res =>   {
      const msg = (typeof res.errors[0].msg) === 'string' ? res.errors[0].msg : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, {variant: res.errors[0].type});
    } );
  }, [doorsResponses]);


  return (
      <div className={classes.main}>
        <BrowserRouter basename="/">
          <Header />
          <Switch>
            <Route exact path={`/`} component={Users}/>
            <Route exact path={`/users`} component={Users}/>
            <Route exact path={`/doors`} component={Doors}/>
            <Route exact path={`/permissions`} component={Permissions}/>
            <Route exact path={`/settings`} component={Settings}/>
            <Route component={Ni}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users,
    logins: state.logins,
    doors: state.doors
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);