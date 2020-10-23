import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import io from "socket.io-client";
import { Icon } from "react-native-elements";

import { apiServer } from "./constants";
const colorOn = "#eeff41";
const colorOff = "#f50";
const { width } = Dimensions.get("window");

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      building: "B 007",
      room_number: "0111",
      devices: {
        door: false,
        stove: false,
        television: false,
        light: false,
      },
    };

    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    const socket = io(apiServer, {
      transports: ["websocket", "polling"],
    });
    this.socket = socket;

    socket.on("update", (data) => {
      let obj = {};
      data.url.split("&").map((part) => {
        const [key, value] = part.split("=");
        obj[key] = decodeURIComponent(value);
      });

      const { building, room_number } = this.state;

      if (obj.building === building && obj.room_number === room_number) {
        const open = data.url.includes("open");
        const { devices } = this.state;
        switch (obj.device) {
          case "door":
            devices.door = open;
            break;
          case "stove":
            devices.stove = open;
            break;
          case "television":
            devices.television = open;
            break;
          case "light":
            devices.light = open;
            break;
        }

        this.setState({ devices });
      }
    });
  }

  componentWillUnmount() {
    // Should close it to avoid memory leak
    this.socket.close();
  }

  render() {
    const { devices } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconContainer}>
              <View style={styles.iconContainerLeft}>
                <Text>Door</Text>
              </View>
              <View style={styles.iconContainerRight}>
                <Icon
                  raised
                  name="door-open"
                  size={34}
                  type="font-awesome-5"
                  color={devices.door === false ? colorOff : colorOn}
                  onPress={() => console.log("hello")}
                />
              </View>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.iconContainerLeft}>
                <Text>Kitchen stove</Text>
              </View>
              <View style={styles.iconContainerRight}>
                <Icon
                  raised
                  name="fire"
                  size={34}
                  type="font-awesome"
                  color={devices.stove === false ? colorOff : colorOn}
                  onPress={() => console.log("hello")}
                />
              </View>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.iconContainerLeft}>
                <Text>Television</Text>
              </View>
              <View style={styles.iconContainerRight}>
                <Icon
                  raised
                  name="television"
                  size={34}
                  type="font-awesome"
                  color={devices.television === false ? colorOff : colorOn}
                  onPress={() => console.log("hello")}
                />
              </View>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.iconContainerLeft}>
                <Text>Light</Text>
              </View>
              <View style={styles.iconContainerRight}>
                <Icon
                  raised
                  name="lightbulb-o"
                  size={34}
                  type="font-awesome"
                  color={devices.light === false ? colorOff : colorOn}
                  onPress={() => console.log("hello")}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            style={{
              height: 35,
              flex: 3,
              borderColor: "#bdbdbd",
              borderWidth: StyleSheet.hairlineWidth,
              color: "black",
              paddingLeft: 5,
              marginTop: 4,
            }}
            value={this.state.building}
            onChangeText={(building) => this.setState({ building })}
            placeholder="Building"
            placeholderTextColor={"gray"}
          />
          <TextInput
            autoCapitalize="none"
            style={{
              height: 35,
              flex: 1,
              borderColor: "#bdbdbd",
              borderWidth: StyleSheet.hairlineWidth,
              color: "black",
              paddingLeft: 5,
              marginTop: 4,
            }}
            keyboardType={"numeric"}
            value={this.state.room_number}
            onChangeText={(room_number) => this.setState({ room_number })}
            placeholder="Room"
            placeholderTextColor={"gray"}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  form: {
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#b3e5fc",
    width: width - 10,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerLeft: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
