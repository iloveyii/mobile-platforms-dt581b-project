import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { theme } from "../constants/index";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

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
          onChangeText={(email) => this.setState({ email })}
          placeholder="Lösenord"
          placeholderTextColor={theme.colors.gray}
        />

        <TouchableOpacity
          key={`log-in`}
          onPress={() => this.onPress()}
          style={styles.touch}
        >
          <Text style={styles.text}>Logga in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
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
