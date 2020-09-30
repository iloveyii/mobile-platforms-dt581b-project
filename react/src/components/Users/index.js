import React, { useEffect, useState } from "react";
import UseForm from "./UseForm";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import models from '../../store/models';

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

function index() {
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

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
    createAction: models.users.actions.create,
    readAction: models.users.actions.read,
    updateAction: models.users.actions.update,
    deleteAction: models.users.actions.delete,
};

export default (connect(mapStateToProps, mapActionsToProps)(index));
