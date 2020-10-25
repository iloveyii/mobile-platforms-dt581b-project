import React from "react";
import Graph from "./Graph";
import Stats from "./Stats";
import Table from "./Table";
import { Header } from "../../Layouts";
import { withStyles } from "@material-ui/styles";
import { Container, Paper, Button } from "@material-ui/core";
import models from "../../store";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

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
    this.state = {
      sensor_data: {
        temperature: { value: 32, unit: "°C" },
        co2: { value: 954, unit: "mol" },
        humidity: { value: 26, unit: "g.m-3" },
        pressure: { value: 840, unit: "pas" },
      },
    };
  }

  setForm(props) {
    const { sensor_data } = this.props;
    if (sensor_data) {
      this.setState({ sensor_data });
    }
  }

  componentDidMount() {
    const { user, readAction } = this.props;
    if (user) {
      this.intID = setInterval(() => {
        console.log("READ Sensor data");
        readAction({ id: user.id });
      }, 1000 * 5);
    }
    this.setForm(this.props);
  }

  componentWillUnmount() {
    // clearInterval(this.intID);
  }

  componentWillReceiveProps(nextProps, nextConext) {
    this.setForm(nextProps);
  }

  render() {
    const { classes } = this.props;
    const { temperature, co2, humidity, pressure } = this.state.sensor_data;
    return (
      <div className={classes.main}>
        <Header />

        <Container maxWidth="lg" style={{ marginTop: 20 }}>
          <div className="row">
            <Stats
              type="warning"
              icon="fa-cloud"
              subicon="date_range"
              title="Temperature"
              subtitle="Heating system"
              data={temperature}
            />
            <Stats
              type="success"
              icon="fa-picture-o"
              subicon="warning"
              title="CO2"
              subtitle="Air freshness"
              data={co2}
            />
            <Stats
              type="danger"
              icon="fa-compass"
              subicon="local_offer"
              title="Humidity"
              subtitle="Coolness & breeze"
              data={humidity}
            />
            <Stats
              type="info"
              icon="fa-cc"
              subicon="update"
              title="Pressure"
              subtitle="Air pressure"
              data={pressure}
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
            <Table id="multilineChart" type="success" title="Live stream" />
            <Table id="barChart" type="info" title="Consumption" />
          </div>
        </Container>
      </div>
    );
  }
}

Charts.defaultProps = {
  sensor_data: {
    temperature: { value: 32, unit: "°C" },
    co2: { value: 954, unit: "mol" },
    humidity: { value: 26, unit: "g.m-3" },
    pressure: { value: 840, unit: "pas" },
  },
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  sensor_data:
    state.sensor_datas.list.length > 0
      ? state.sensor_datas.list[0].data
      : undefined,
  user: state.logins.list.length > 0 ? state.logins.list[0] : undefined,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  readAction: models.sensor_datas.actions.read,
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapActionsToProps)(Charts))
);
