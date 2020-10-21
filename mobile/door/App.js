import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import io from "socket.io-client";
import { Icon } from "react-native-elements";

const apiServer = "http://194.47.40.125:7700";
const colorOn = "#eeff41";
const colorOff = "#f50";

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

  render() {
    const { devices } = this.state;
    return (
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
                size={36}
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
                size={36}
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
                size={36}
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
                size={36}
                type="font-awesome"
                color={devices.light === false ? colorOff : colorOn}
                onPress={() => console.log("hello")}
              />
            </View>
          </View>
        </View>
      </View>
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
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#b3e5fc",
    width: "100%",
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
