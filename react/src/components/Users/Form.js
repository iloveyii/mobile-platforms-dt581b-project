import React from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import Snackbar from '../Snackbar';

const useStyle = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

export default function Form(props) {
  const { onChange, values, onSubmit, onDelete, status } = props;
  const classes = useStyle();
  return (
    <form autoComplete="off" noValidate className={classes.form}>
      <Typography variant="h5">Users</Typography>
      <TextField
        margin="normal"
        label="Name"
        variant="outlined"
        name="name"
        onChange={onChange}
        value={values.name}
      />
      <TextField
        margin="normal"
        label="Email"
        variant="outlined"
        name="email"
        onChange={onChange}
        value={values.email}
        fullWidth
      />
      <TextField
        margin="normal"
        label="Address"
        variant="outlined"
        name="address"
        onChange={onChange}
        value={values.address}
      />
      <Button
        style={{ marginTop: "1em" }}
        margin="normal"
        size="large"
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Save
      </Button>
      {values.id && (
        <Button
          style={{ marginTop: "1em" }}
          margin="normal"
          size="large"
          variant="contained"
          color="secondary"
          onClick={onDelete}
        >
          Delete
        </Button>
      )}

      <Snackbar status={status} />
    </form>
  );
}
