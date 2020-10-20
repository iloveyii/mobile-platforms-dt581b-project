import React from "react";
import Graph from "./Graph";
import Stats from "./Stats";
import Table from "./Table";
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
            <Stats
              type="warning"
              icon="fa-cloud"
              subicon="date_range"
              title="Temperature"
              subtitle="Heating system"
              data={{ value: "53/100 ", unit: "GB" }}
            />
            <Stats
              type="success"
              icon="fa-picture-o"
              subicon="warning"
              title="CO2"
              subtitle="Air freshness"
              data={{ value: "53/100 ", unit: "GB" }}
            />
            <Stats
              type="danger"
              icon="fa-compass"
              subicon="local_offer"
              title="Humidity"
              subtitle="Coolness & breeze"
              data={{ value: "53/100 ", unit: "GB" }}
            />
            <Stats
              type="info"
              icon="fa-cc"
              subicon="update"
              title="Lights"
              subtitle="Lumination"
              data={{ value: "53/100 ", unit: "GB" }}
            />
          </div>
          <div className="row">
            <Graph
              title="Temperature"
              type="success"
              id="temperature"
              average=" 22.5"
            />
            <Graph
              title="Pressure"
              type="warning"
              id="pressure"
              average=" 23.4"
            />
            <Graph
              title="Humidity"
              type="danger"
              id="humidity"
              average=" 27.1"
            />
          </div>

          <div className="row">
            <Table type="success" title="Live stream" />
            <Table type="info" title="Latest updates" />
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Charts);
