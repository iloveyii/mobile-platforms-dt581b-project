import React from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import models from '../../store/models';

const useStyle = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

function Form(props) {
  const { onChange, values, onSubmit, onDelete } = props;
  const classes = useStyle();

  const create = (e) => {
    e.preventDefault();
    onSubmit(e);
    const model = models.users;

    if(model && model.validate(values)) {
      props.createAction(model.form);
      console.log('User created;', model.form);
    }
  }
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
        onClick={create}
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
    </form>
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
    deleteAction: models.users.actions.delete
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Form));
