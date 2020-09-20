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
  const { openPopup, setOpenPopup } = props;
  const classes = useStyle();
  return (
    <Dialog
      className={classes.paper}
      fullWidth={true}
      maxWidth="xs"
      open={openPopup}
    >
      <DialogTitle>
        User Form
        <Button
          style={{ float: "right" }}
          margin="normal"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpenPopup(false)}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
