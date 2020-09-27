import React, { useEffect, useState } from "react";
import UseForm from "./UseForm";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UsersList from "./UsersList";
import UserService from "./UserService";
import Popup from "../Popup";
import Form from "./Form";

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
  const { values, setValues, onChange, onSubmit, onDelete, list, status } = UseForm({
    defaultValues
  });
  const userService = UserService();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={0}></Paper>
      </Container>

      <Container maxWidth="md">
        <Button
          style={{ marginTop: "1em" }}
          margin="normal"
          size="large"
          variant="contained"
          color="primary"
          onClick={() => setOpenPopup(true)}
        >
          Add New
        </Button>
        <UsersList
          setOpenPopup={setOpenPopup}
          setValues={setValues}
          onDelete={onDelete}
          rows={userService.readAll()}
        />
      </Container>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Form
          onChange={onChange}
          values={values}
          onSubmit={onSubmit}
          onDelete={onDelete}
          status={status}
        />
      </Popup>
    </>
  );
}
