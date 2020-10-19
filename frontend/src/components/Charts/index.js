import React from "react";
import Graph from "./Graph";
import { Header } from "../../Layouts";
import { withStyles } from "@material-ui/styles";
import { Container, Paper, Button } from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme) => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

class Charts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Header />

        <Container maxWidth="lg">
          <div className="row">
            <Graph title="Temperature" type="success" id="temperature" />
            <Graph title="Pressure" type="warning" id="pressure" />
            <Graph title="Humidity" type="danger" id="humidity" />
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Charts);
