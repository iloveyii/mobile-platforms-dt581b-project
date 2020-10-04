import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Paper, Button} from "@material-ui/core";
import OfflinePinOutlinedIcon from '@material-ui/icons/OfflinePinOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import Popup from "../Popup";
import Form from "./Form";

import ConfirmDialog from '../ConfirmDialog';
import models from '../../store/models';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  }
}));

function UsersList(props) {
  const { rows, users, values, setValues, onDelete, deleteAction} = props;
  const [showDialog, setShowDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  console.log(rows, props);
  const classes = useStyles();

  const deleted = (row) => {
    console.log('Deleting ', row);
    setValues(row);
    props.deleteAction(row);
  }

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
          {users.map((row, i) => (
            <TableRow
              style={{ cursor: "pointer" }}
              key={i}
              onClick={(e) => {
                e.preventDefault();
                props.editAction(row);
                setOpenPopup(true);
              }}
            >
              <TableCell onClick={()=>{ props.editAction(row); setOpenPopup(true)} } component="th" scope="row">{row.name}</TableCell>
              <TableCell onClick={()=>{ props.editAction(row); setOpenPopup(true)} } align="right">{row.email}</TableCell>
              <TableCell onClick={()=>{ props.editAction(row); setOpenPopup(true)} } align="right">{row.address}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ float: "right", padding: 3 }}
                  margin="normal"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={(e) => { deleted(row); setShowDialog(true); } }
                >
                  <CancelPresentationOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog onDelete={deleted} showDialog={showDialog} setShowDialog={setShowDialog} action={()=>console.log('delete')} />
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Form />
      </Popup>
    </TableContainer>
  );
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
  editAction: models.users.actions.edit
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(UsersList));
