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

const data = {
  days: {
    1: {
      average: {
        temperature: 22,
        co2: 688,
        humidity: 27,
        pressure: 1001,
      },
    },
    2: {
      average: {
        temperature: 28,
        co2: 935,
        humidity: 31,
        pressure: 1040,
      },
    },
    25: {
      average: {
        temperature: 21,
        co2: 837,
        humidity: 29,
        pressure: 1010,
      },
    },
  },
};

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
      stats: {
        days: {
          1: {
            average: {
              temperature: 26,
              co2: 1208,
              humidity: 24,
              pressure: 1202,
            },
          },
          2: {
            average: {
              temperature: 1,
              co2: 1453,
              humidity: 39,
              pressure: 1320,
            },
          },
        },

        weeks: {
          41: {
            average: {
              temperature: 40,
              co2: 960,
              humidity: 25,
              pressure: 589,
            },
          },
          42: {
            average: {
              temperature: 27,
              co2: 700,
              humidity: 34,
              pressure: 1083,
            },
          },
          43: {
            average: {
              temperature: 22,
              co2: 598,
              humidity: 29,
              pressure: 1019,
            },
          },
          44: {
            average: {
              temperature: 18,
              co2: 1019,
              humidity: 32,
              pressure: 1050,
            },
          },
          45: {
            average: {
              temperature: 20,
              co2: 892,
              humidity: 30,
              pressure: 1046,
            },
          },
        },
      },
    };
  }

  setForm(props) {
    const { stats } = props;
    if (stats) {
      this.setState({ stats });
    }
  }

  componentDidMount() {
    const { login, users, readAction } = this.props;
    if (login) {
      const user = users.find((u) => u.email === login.email);
      if (user && user.id) {
        readAction({ suffix: "/" + user.id + "/stats" });
        this.intID = setInterval(() => {
          console.log("READ Sensor data");
          readAction({ suffix: "/" + user.id + "/stats" });
        }, 1000 * 60 * 10);
      }
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
            <Table
              id="multilineChart"
              type="success"
              title="Daily"
              data={{ days: this.state.stats.days }}
            />
            <Table
              id="barChart"
              type="info"
              title="Weekly"
              data={{ weeks: this.state.stats.weeks }}
            />
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
  stats:
    state.sensor_datas.list.length > 0 ? state.sensor_datas.list[0] : undefined,
  login: state.logins.list.length > 0 ? state.logins.list[0] : undefined,
  users: state.users.list.length > 0 ? state.users.list : [],
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
