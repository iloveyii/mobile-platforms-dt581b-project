import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  paper: {
    padding: "40px"
  }
}));

export default function Popup(props) {
  const { open, setOpen, title } = props;
  const classes = useStyle();
  return (
    <Dialog
      className={classes.paper}
      fullWidth={true}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>
        {title ? title : 'User Form'}
        <Button
          style={{ float: "right" }}
          margin="normal"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpen(false)}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
