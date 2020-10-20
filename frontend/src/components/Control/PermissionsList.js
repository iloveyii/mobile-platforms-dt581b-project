import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Paper, Button } from "@material-ui/core";
import OfflinePinOutlinedIcon from "@material-ui/icons/OfflinePinOutlined";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Popup from "../Popup";

import ConfirmDialog from "../ConfirmDialog";
import models from "../../store";

const styles = (theme) => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  },
});

class PermissionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      openConfirmDialog: false,
      currentUser: null,
    };
  }

  openDoor = (row) => {
    console.log("opening Door ", row);
    const { updateAction } = this.props;
    updateAction({
      id: row.id,
      building: row.building,
      room_number: row.room_number,
      status: "1",
      command: "open",
    });
  };

  componentWillReceiveProps(nextProps, context) {
    console.log("componentWillReceiveProps", nextProps);
  }

  getPermissions = (actions) => {
    for (let id in actions) {
      console.log("Permissions id ", id);
      if (
        actions[id].res &&
        actions[id].res.status === true &&
        actions[id].res.type === "logins.create"
      ) {
        console.log("Permissions id", actions[id].res.form[0].permissions);
        return actions[id].res.form[0].permissions;
      } else {
        console.log("Permissions id not permissins");
      }
    }

    return [];
  };

  render() {
    const { classes, actions } = this.props;
    const permissions = this.getPermissions(actions);
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <label>Building</label>
              </TableCell>
              <TableCell align="right">
                <label>Room</label>
              </TableCell>
              <TableCell align="right">
                <label>Status</label>
              </TableCell>
              <TableCell align="right">
                <label>X</label>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((row, i) => (
              <TableRow style={{ cursor: "pointer" }} key={i}>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  component="th"
                  scope="row"
                >
                  {row.building}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.room_number}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.status}
                </TableCell>

                <TableCell align="right">
                  <Button
                    style={{ float: "right" }}
                    margin="normal"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.openDoor(row);
                    }}
                  >
                    <MeetingRoomOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  actions: state.logins.actions || [],
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  updateAction: models.gatekeepers.actions.update,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(PermissionsList))
);
