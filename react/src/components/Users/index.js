import React, { useEffect } from "react";
import UseForm from "./UseForm";
import {
  Container,
  TextField,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UsersList from "./UsersList";
import UserService from "./UserService";

const useStyle = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  }
}));

const defaultValues = {
  name: "",
  email: "",
  address: ""
};

export default function index() {
  const classes = useStyle();
  const { values, onChange, onSubmit, list } = UseForm({ defaultValues });
  const userService = UserService();

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={0}>
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
          </form>
        </Paper>
      </Container>

      <Container maxWidth="md">
        <UsersList rows={userService.readAll()} />
      </Container>
    </>
  );
}
