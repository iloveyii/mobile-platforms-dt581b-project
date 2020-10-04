import React, { useEffect, useState } from "react";
import UseForm from "./UseForm";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";


import models from '../../store/models';
import UsersList from "./UsersList";
import Popup from "../Popup";
import Form from "./Form";
import PageHeader from "../PageHeader";

const useStyle = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
}));

function index(props) {
  const classes = useStyle();
  const [openPopup, setOpenPopup] = useState(false);

  const onClickOpenPopup = e => {
    e.preventDefault();
    setOpenPopup(true);
    props.editResetAction();
  }

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={0}></Paper>
      </Container>

      <Container maxWidth="md">
        <PageHeader
          title="SDG Goals"
          subtitle="Description about SDG goals"
          imageUrl="/images/good-health-and-well-being-sdg.jpg"
        />

        <Button
          style={{ marginTop: "1em", float: 'right', marginBottom: 20 }}
          margin="small"
          size="large"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon/>}
          onClick={onClickOpenPopup}
        >
         { /* <Icon style={{ color: green[500] }}>add_circle</Icon> */ }
        </Button>

        <UsersList/>
      </Container>
      <Popup open={openPopup} setOpen={setOpenPopup}>
        <Form/>
      </Popup>
    </>
  );
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
    editResetAction: models.users.actions.edit_reset,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(index));
