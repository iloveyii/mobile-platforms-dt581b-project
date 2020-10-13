import React from 'react';
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";

import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";
import PermissionsList from "./PermissionsList";
import Dashboard from '../../Pages/Dashboard';


class Permissions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openPopup : false
    }
  }

  onAdd = (e) => {
    e.preventDefault();
    this.setState({openPopup:true});
  }

  render() {

    return (
        <Container maxWidth="md">
          <PageHeader
            title="PERMISSIONS"
            subtitle="Description about permissions"
            imageUrl="/images/permissions.png"
          />
          <Button onClick={this.onAdd} />

          <PermissionsList />

          <Popup title="Add Permissions" open={this.state.openPopup} setOpen={(status)=>this.setState({openPopup: status})}>
            <Form/>
          </Popup>
        </Container>
    )
  }
}

export default Permissions;
