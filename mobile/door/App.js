import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import io from "socket.io-client";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      building: "B 007",
      room_number: "0111",
    };

    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    const socket = io("http://10.3.141.219:7700", {
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
        this.setState({ open });
      }
    });
  }

  render() {
    const LED = {
      backgroundColor: this.state.open ? "lightgreen" : "red",
      height: 30,
      position: "absolute",
      flexDirection: "row",
      bottom: 0,
      width: 100,
      height: 100,
      top: 120,
      borderRadius: 40,
      justifyContent: "space-between",
    };

    return (
      <View style={styles.container}>
        <Button
          onPress={this.emit}
          title={this.state.open ? "Turn off" : "Turn on"}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={LED}></View>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
