import React from 'react';
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";

import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";

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
      <Container maxWidth="md">
        <PageHeader
          title="DOORS"
          subtitle="Description about doors"
          imageUrl="/images/doors.jpg"
        />
        <Button onClick={this.onAdd} />

        <Popup title="Add Door" open={this.state.openPopup} setOpen={(status)=>this.setState({openPopup: status})}>
          <Form/>
        </Popup>

      </Container>
    )
  }
}

export default Doors;
