import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Paper, Button} from "@material-ui/core";
import OfflinePinOutlinedIcon from '@material-ui/icons/OfflinePinOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import { withStyles } from '@material-ui/styles';


import Popup from "../Popup";
import Form from "./Form";

import ConfirmDialog from '../ConfirmDialog';
import models from '../../store/models';


const styles = theme => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  }
});

class  UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup : false,
      openConfirmDialog: false
    }
  }


  deleted = (row) => {
    console.log('Deleting ', row);
    this.props.deleteAction(row);
  }

  componentWillReceiveProps(nextProps, context) {
    console.log('componentWillReceiveProps', nextProps)
  }

  render() {
    const {classes, users} = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">X</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map((row, i) =>
              <TableRow
                style={{ cursor: "pointer" }}
                key={i}
              >
                <TableCell onClick={()=> {this.props.editAction(row); this.setState({openPopup:true});} } component="th" scope="row">{row.name}</TableCell>
                <TableCell onClick={()=>{this.props.editAction(row); this.setState({openPopup:true});} } align="right">{row.email}</TableCell>
                <TableCell onClick={()=>{this.props.editAction(row); this.setState({openPopup:true});} } align="right">{row.address}</TableCell>

                <TableCell align="right">
                  <Button
                    style={{ float: "right", padding: 3 }}
                    margin="normal"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => { this.setState({openConfirmDialog:true}); } }
                  >
                    <CancelPresentationOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ConfirmDialog open={this.state.openConfirmDialog} setOpen={status=>this.setState({openConfirmDialog:status})} onDelete={this.deleted} />

        <Popup open={this.state.openPopup} setOpen={status => this.setState({openPopup:status})}>
          <Form />
        </Popup>

      </TableContainer>

      )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users.list || [],
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  editAction: models.users.actions.edit,
  deleteAction: models.users.actions.delete
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(UsersList)));
