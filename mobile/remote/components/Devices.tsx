import * as WebBrowser from "expo-web-browser";
import React from "react";
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

export default class EditScreenInfo extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onPress = (e: any) => {
    console.log(e);
  };

  render() {
    const { devices } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>List</Text>
        {Object.keys(devices).length === 0 ? null : (
          <View>
            {devices.map((device: any, i: number) => {
              return (
                <View key={device.id} style={styles.row}>
                  <View key={device.id} style={styles.subrow}>
                    <Text style={styles.td}>{device.building}</Text>
                    <Text style={styles.td}>{device.room_number}</Text>
                  </View>
                  <View style={styles.subrow}>
                    <TouchableOpacity
                      key={`door-${i}`}
                      onPress={() => this.onPress()}
                      style={styles.touch}
                    >
                      <Text style={styles.text}>Logga in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`stove-${i}`}
                      onPress={() => this.onPress()}
                      style={styles.touch}
                    >
                      <Text style={styles.text}>Logga in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`television-${i}`}
                      onPress={() => this.onPress()}
                      style={styles.touch}
                    >
                      <Text style={styles.text}>Logga in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`light-${i}`}
                      onPress={() => this.onPress()}
                      style={styles.touch}
                    >
                      <Text style={styles.text}>Logga in</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    width: width - 6,
    padding: 5,
    borderRadius: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  inputText: {
    textAlign: "left",
    borderColor: "grey",
  },
  touch: {
    padding: 15,
    backgroundColor: theme.bluish.blue1,
    borderColor: theme.bluish.green1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    marginLeft: 2,
    marginRight: 2,
    flex: 1,
  },
  text: {
    color: theme.bluish.green3,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    justifyContent: "space-between",
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    borderRadius: 3,
    display: "flex",
    backgroundColor: "#b3e5fc",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  subrow: {
    marginBottom: 10,
    marginTop: 10,
    display: "flex",
    backgroundColor: "#b3e5fc",
    flexDirection: "row",
  },
  td: {
    flex: 1,
    textAlign: "center",
  },
});
