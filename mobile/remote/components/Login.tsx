import * as WebBrowser from "expo-web-browser";
import React, { Fragment } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { theme } from "../constants/index";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
const { width } = Dimensions.get("window");

type FormT = {
  email: string;
  password: string;
};

type Props = {
  handleLogin: Function;
};

export default class Login extends React.Component {
  state: FormT = {
    email: "admin@admin.com",
    password: "admin",
  };
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={{
            height: 35,
            borderColor: theme.colors.lightGrey,
            borderWidth: StyleSheet.hairlineWidth,
            color: "black",
            paddingLeft: 5,
            marginTop: 6,
          }}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="Fill i din mail här"
          placeholderTextColor={theme.colors.gray}
        />
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
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder="Lösenord"
          placeholderTextColor={theme.colors.gray}
        />

        <TouchableOpacity
          key={`log-in`}
          onPress={() => this.props.handleLogin(this.state)}
          style={styles.touch}
        >
          <Text style={styles.text}>Logga in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
    width: width - 6,
    padding: 20,
    marginTop: 50,
  },
  inputText: {
    textAlign: "left",
    borderColor: "grey",
  },
  touch: {
    padding: 15,
    backgroundColor: theme.bluish.blue1,
    marginTop: 20,
    borderColor: theme.bluish.green1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: theme.bluish.green3,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
