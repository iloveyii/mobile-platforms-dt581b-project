import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { MoveToInbox, Mail } from "@material-ui/icons";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import OfflinePinOutlinedIcon from '@material-ui/icons/OfflinePinOutlined';
import Hidden from "@material-ui/core/Hidden";
import {Link} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    textDecoration: 'none'
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  list: {
    width: 250
  },
  primary: {
      width: 40,
  }
}));

export default function SwipeableTemporaryDrawer({ state, toggleDrawer }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const list = () => (
    <div
      className={classes.toolbar}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>

        <Link to='/users'>
          <ListItem button key="key-users">
              <ListItemIcon>
                  <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText classes={classes.primary} primary="Users" />
          </ListItem>
        </Link>

        <Link to='/doors'>
          <ListItem button key="key-doors">
              <ListItemIcon>
                  <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="Doors" />
          </ListItem>
        </Link>

        <Link to='/permissions'>
          <ListItem button key="key-permissions">
              <ListItemIcon>
                  <OfflinePinOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Permissions" />
          </ListItem>
        </Link>

        <Link to='/settings'>
          <ListItem button key="key-settings">
              <ListItemIcon>
                  <SettingsApplicationsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
          </ListItem>
        </Link>

        {["All mail", "Mail", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <div>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {list()}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {list()}
        </SwipeableDrawer>
      </Hidden>
    </div>
  );
}
