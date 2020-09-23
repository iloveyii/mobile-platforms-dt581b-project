import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  makeStyles,
  Slide
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  paper: {
    padding: "40px",
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
      margin: 0
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const classes = useStyle();
  return (
    <Dialog
      className={classes.paper}
      fullWidth={true}
      maxWidth="xs"
      TransitionComponent={Transition}
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
