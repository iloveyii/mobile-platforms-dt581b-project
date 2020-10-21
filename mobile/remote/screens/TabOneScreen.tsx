import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";

import Login from "../components/Login";
import Devices from "../components/Devices";
import { Text, View } from "../components/Themed";

const { width } = Dimensions.get("window");

export default class TabOneScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
      email: "",
      password: "",
    };
  }

  componentDidMount() {}

  handleLogin = (form: any) => {
    this.setState({ form });
    fetch("http://10.3.141.219:7700/api/v1/logins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ devices: data.data[0].permissions }))
      .catch((error) => console.log(error));

    console.log("form", form);
  };

  render() {
    const { devices } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {Object.keys(devices).length === 0 ? (
          <Login handleLogin={this.handleLogin} />
        ) : (
          <Devices devices={devices} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width - 6,
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
