import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Paper, Button} from "@material-ui/core";
import ConfirmDialog from '../ConfirmDialog';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    marginTop: theme.spacing(3)
  }
}));

export default function UsersList(props) {
  const { rows, setValues, setOpenPopup, onDelete } = props;
  const [showDialog, setShowDialog] = useState(false);
  console.log(rows, props);
  const classes = useStyles();

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
          {rows.map((row, i) => (
            <TableRow
              style={{ cursor: "pointer" }}
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setValues(row);
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell onClick={()=> setOpenPopup(true)} align="right">{row.email}</TableCell>
              <TableCell onClick={()=> setOpenPopup(true)} align="right">{row.address}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ float: "right" }}
                  margin="normal"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setShowDialog(true) }
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog onDelete={onDelete} showDialog={showDialog} setShowDialog={setShowDialog} action={()=>console.log('delete')} />
    </TableContainer>
  );
}
