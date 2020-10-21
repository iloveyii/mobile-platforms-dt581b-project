import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

import { theme, apiServer } from "../constants/index";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

const { width } = Dimensions.get("window");
const colorOn = "#eeff41";
const colorOff = "#f50";

export default class EditScreenInfo extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onPress = (row: any, device: string) => {
    const { permissions } = this.props;
    permissions.map((permission: any) => {
      if (permission.id === row.id) {
        console.log("COMPARE", permission.id, row.id, permission.id === row.id);
        permission.devices[device] = !permission.devices[device];
      }
    });
    this.setState({ permissions });

    this.updateAction({
      id: row.id,
      building: row.building,
      room_number: row.room_number,
      device: device,
      status: "1",
      command: row.devices[device] === true ? "open" : "close",
    });
  };

  updateAction = (form: any) => {
    fetch(apiServer + "/gatekeepers/" + form.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { permissions } = this.props;
    return (
      <View style={styles.container}>
        {Object.keys(permissions).length === 0 ? null : (
          <View>
            {permissions.map((permission: any, i: number) => {
              const style =
                i === 0
                  ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
                  : {};
              return (
                <View key={permission.id} style={{ ...styles.row, ...style }}>
                  <View style={styles.subrow}>
                    <Text style={styles.td}>{permission.building}</Text>
                    <Text style={styles.td}>{permission.room_number}</Text>
                  </View>
                  <View style={styles.subrow}>
                    <TouchableOpacity
                      key={`door-${i}`}
                      onPress={() => this.onPress(permission, "door")}
                      style={styles.touch}
                    >
                      <Icon
                        raised
                        name="door-open"
                        size={32}
                        type="font-awesome-5"
                        color={
                          permission.devices.door === false ? colorOff : colorOn
                        }
                        onPress={() => this.onPress(permission, "door")}
                      />
                      <Text style={styles.text}>Door</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`stove-${i}`}
                      onPress={() => this.onPress(permission, "stove")}
                      style={styles.touch}
                    >
                      <Icon
                        raised
                        name="fire"
                        size={32}
                        type="font-awesome"
                        color={
                          permission.devices.stove === false
                            ? colorOff
                            : colorOn
                        }
                        onPress={() => this.onPress(permission, "stove")}
                      />
                      <Text style={styles.text}>Stove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`television-${i}`}
                      onPress={() => this.onPress(permission, "television")}
                      style={styles.touch}
                    >
                      <Icon
                        raised
                        name="television"
                        size={32}
                        type="font-awesome"
                        color={
                          permission.devices.television === false
                            ? colorOff
                            : colorOn
                        }
                        onPress={() => this.onPress(permission, "television")}
                      />
                      <Text style={styles.text}>TV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={`light-${i}`}
                      onPress={() => this.onPress(permission, "light")}
                      style={styles.touch}
                    >
                      <Icon
                        raised
                        name="lightbulb-o"
                        size={32}
                        type="font-awesome"
                        color={
                          permission.devices.light === false
                            ? colorOff
                            : colorOn
                        }
                        onPress={() => this.onPress(permission, "light")}
                      />

                      <Text style={styles.text}>Light</Text>
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
  },
  inputText: {
    textAlign: "left",
    borderColor: "grey",
  },
  touch: {
    padding: 1,
    backgroundColor: "#fff3e0",
    borderColor: "#039be5",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
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
