import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements";
import { apiServer } from "../settings";
import { theme } from "../constants";

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
      connected: false,
      permissions: [],
      email: "",
      password: "",
      apiServer,
    };
  }

  componentDidMount() {}

  handleLogin = (form: any) => {
    this.setState({ form });
    const { apiServer } = this.state;
    console.log("apiServer : ", apiServer);
    fetch(apiServer + "/api/v1/logins", {
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

        this.setState({ permissions, connected: true });
      })
      .catch((error) => console.log(error));

    console.log("form", form);
  };

  render() {
    const { permissions, connected } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <Icon
            raised
            name="wifi"
            size={32}
            type="font-awesome"
            color={connected === false ? "red" : "green"}
            onPress={() => this.setState({ permissions: [], connected: false })}
          />

          {Object.keys(permissions).length === 0 ? (
            <Login handleLogin={this.handleLogin} />
          ) : (
            <Devices permissions={permissions} />
          )}
        </View>
        <View style={styles.ip}>
          <TextInput
            autoCapitalize="none"
            style={{
              height: 35,
              width: 200,
              borderColor: theme.colors.lightGrey,
              borderWidth: StyleSheet.hairlineWidth,
              color: "black",
              paddingLeft: 5,
              marginTop: 4,
            }}
            value={this.state.apiServer}
            onChangeText={(apiServer) => this.setState({ apiServer })}
            placeholder="apiServer"
            placeholderTextColor={theme.colors.gray}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    width: width - 6,
    backgroundColor: "#b3e5fc",
  },
  ip: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
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
