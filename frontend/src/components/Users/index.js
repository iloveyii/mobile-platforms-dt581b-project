import React, { useEffect, useState } from "react";
import UseForm from "./UseForm";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import UsersList from "./UsersList";
import UserService from "./UserService";
import Popup from "../Popup";
import Form from "./Form";
import PageHeader from "../PageHeader";

const useStyle = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
}));

const defaultValues = {
  name: "",
  email: "",
  address: ""
};

function index(props) {
  const classes = useStyle();
  const { values, setValues, onChange, onSubmit, onDelete, list } = UseForm({
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
          onClick={() => {setValues({...defaultValues}); setOpenPopup(true);}}
        >
         { /* <Icon style={{ color: green[500] }}>add_circle</Icon> */ }
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
        />
      </Popup>
    </>
  );
}


export default index;
