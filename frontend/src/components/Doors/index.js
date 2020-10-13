import React from 'react';
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";

import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";
import DoorsList from "./DoorsList";
import Dashboard from '../../Pages/Dashboard';


class Doors extends React.Component {

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
      <Dashboard>
        <Container maxWidth="md">
          <PageHeader
            title="DOORS"
            subtitle="Description about doors"
            imageUrl="/images/doors.jpg"
          />
          <Button onClick={this.onAdd} />

          <DoorsList />

          <Popup title="Add Door" open={this.state.openPopup} setOpen={(status)=>this.setState({openPopup: status})}>
            <Form/>
          </Popup>
        </Container>
      </Dashboard>
    )
  }
}

export default Doors;
