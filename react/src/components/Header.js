import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "../Layouts/Drawer";

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateZ(0)"
  },
  searchInput: {
    padding: theme.spacing(2),
    "& .MuiInputBase-inputAdornedStart": {
      padding: theme.spacing(1),
      opacity: 0.6,
      "&:hover": {
        backgroundColor: "#f1f1f1"
      }
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  item: {
    display: "flex"
  }
}));

export default function Header() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false
  });

  const toggleDrawer = open => event => {
    console.log("toggleDrawer ", open);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ open });
  };
  return (
    <>
      <AppBar color="default" position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              className={classes.item}
              alignItems="center"
              justify="center"
            >
              <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.searchInput}
                placeholder="Search"
                startAdornment={<SearchIcon />}
              />
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={5} color="primary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
              <IconButton>
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer toggleDrawer={toggleDrawer} state={state} />
    </>
  );
}
