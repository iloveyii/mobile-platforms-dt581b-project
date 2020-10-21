import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { theme, apiServer } from "../constants/index";

import Login from "../components/Login";
import Devices from "../components/Devices";
import { Text, View } from "../components/Themed";

const { width } = Dimensions.get("window");
const devices = {
  door: false,
  stove: false,
  television: false,
  light: false,
};

export default class WelcomeScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      permissions: [],
      email: "",
      password: "",
    };
  }

  componentDidMount() {}

  handleLogin = (form: any) => {
    this.setState({ form });
    fetch(apiServer + "/logins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        let permissions = data.data[0].permissions;
        permissions = permissions.map((permission: any) => {
          permission.devices = { ...devices };
          return permission;
        });

        this.setState({ permissions });
      })
      .catch((error) => console.log(error));

    console.log("form", form);
  };

  render() {
    const { permissions } = this.state;
    return (
      <View style={styles.container}>
        <Icon
          raised
          name="wifi"
          size={32}
          type="font-awesome"
          color={permissions.light === false ? "red" : "orange"}
          onPress={() => this.setState({ permissions: [] })}
        />

        {Object.keys(permissions).length === 0 ? (
          <Login handleLogin={this.handleLogin} />
        ) : (
          <Devices permissions={permissions} />
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
    backgroundColor: "#b3e5fc",
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
