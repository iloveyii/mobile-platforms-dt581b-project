import React, { useEffect } from "react";
import PageHeader from "../PageHeader";
import { UseForm, Form } from "./UseForm";
import {
  Container,
  TextField,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { display } from "@material-ui/system";

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
  const { values, onChange, onSubmit } = UseForm({ defaultValues });

  useEffect(() => {
    console.log("use effect");
  }, [values]);

  console.log("return", values);

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={0}>
          <Form autoComplete="off" noValidate className={classes.form}>
            <Typography variant="h5">Users</Typography>
            <TextField
              margin="normal"
              label="Name"
              variant="outlined"
              name="name"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              label="Email"
              variant="outlined"
              name="email"
              onChange={onChange}
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
          </Form>
        </Paper>
      </Container>
    </>
  );
}
