import React from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import { withStyles } from '@material-ui/styles';


import models from '../../store/models';

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form : models.users.form
    }
  }

  setForm = props => {
    const {form} = props;
    this.setState({form});
  }
  componentWillReceiveProps(nextProps, context) {
    this.setForm(nextProps);
    console.log('componentWillReceiveProps')
  }

  componentDidMount() {
    this.setForm(this.props);
    console.log('componentDidMount')
  }

  onCreate = (e) => {
    e.preventDefault();
    const model = models.users;
    const {form} = this.state;

    if(model && model.validate(form)) {
      console.log('Update or create ', form, model.form)
      if(form.id) {
        console.log('UPDATE')
        this.props.updateAction({...model.form});
      } else {
        console.log('CREATE')
        this.props.createAction({...model.form});
      }
      this.setState({form: model.resetForm()});
      console.log('User created;', model.form);
    }
  }

  onDelete = e => {
    const {form} = this.state;
    this.props.deleteAction({...form});
  }

  onChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    const {form} = this.state;
    this.setState({form: {...form, [name]:value}});
  }

  render() {
    const {classes} = this.props;
    const {form} = this.state;

    return (
      <form autoComplete="off" noValidate className={classes.form}>
        <Typography variant="h5">Users</Typography>
        <TextField
          margin="normal"
          label="Name"
          variant="outlined"
          name="name"
          onChange={this.onChange}
          value={form.name}
        />
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          name="email"
          onChange={this.onChange}
          value={form.email}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Address"
          variant="outlined"
          name="address"
          onChange={this.onChange}
          value={form.address}
        />
        <Button
          style={{ marginTop: "1em" }}
          margin="normal"
          size="large"
          variant="contained"
          color="primary"
          onClick={this.onCreate}
        >
          Save
        </Button>
        {form.id && (
          <Button
            style={{ marginTop: "1em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="secondary"
            onClick={this.onDelete}
          >
            Delete
          </Button>
        )}
      </form>
    );
  }
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users,
    form: state.users.form
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(Form)));
