import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AppLoading, Font, LinearGradient } from "expo";

import FadeInView from "./FadeInView";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      isReady: false,
      retrograde: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "source-sans-light": require("./assets/fonts/SourceSansPro-ExtraLight.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  getData() {
    fetch("https://mercuryretrogradeapi.com/")
      .then(response => response.json())
      .then(mercury => {
        console.log(mercury);
        let mercuryState = mercury.is_retrograde;

        // set states when games are fetched
        this.setState({
          retrograde: mercuryState,
          isReady: true
        });
      })
      .catch(error => console.error(error));
  }

  async startApp() {
    console.log("started");
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.startApp}
          onFinish={() => this.getData()}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#ff9a9e", "#fad0c4", "#fad0c4"]}
          locations={[0.1, 0.9, 0.99]}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Text style={styles.headline}>Is Mercury In Retrograde!?</Text>
          <FadeInView>
            <Text style={styles.answer}>
              {this.state.retrograde ? "YES" : "Nope"}
            </Text>
          </FadeInView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff9a9e",
    alignItems: "center",
    justifyContent: "center"
  },
  headline: {
    fontSize: 28,
    fontFamily: "source-sans-light",
    color: "#fff"
  },
  answer: {
    fontSize: 42,
    fontFamily: "source-sans-light",
    color: "#fff",
    marginTop: 10
  }
});
