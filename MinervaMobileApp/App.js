import React from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS,
  Animated,
  TouchableOpacity
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import { LinearGradient, Font } from "expo";

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      resetTimer: false,
      fontLoaded: false
    };
    this.currentTime = 0;
  }
  async componentDidMount() {
    await Font.loadAsync({
      "PT-Sans": require("./assets/PT_Sans-Web-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  toggleTimer = () => {
    const timerState = !this.state.timerStart;
    navigator.geolocation.getCurrentPosition(
      location => {
        const data = {
          geo: location,
          time: this.currentTime
        };
        console.log("start");
        if (timerState === false) {
          axios
            .post("https://transzip.appspot.com/finish", data)
            .then(res => {
              console.log("finish end", res.data, data);
              this.setState({ timerStart: timerState, resetTimer: true });
            })
            .catch(error => {
              console.log(error);
              this.setState({ timerStart: timerState, resetTimer: true });
            });
        } else {
          axios
            .post("https://transzip.appspot.com/start", data)
            .then(res => {
              console.log("start end", res.data, data);
              this.setState({ timerStart: timerState, resetTimer: false });
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      error => AlertIOS.alert(error)
    );
  };
  getFormattedTime = time => {
    this.currentTime = time;
  };
  render() {
    return (
      <FadeInView>
        <View style={styles.container}>
          <LinearGradient
            colors={["#D7A4FF", "#F5F2FF"]}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 5,
              height: 700,
              width: 375,

              justifyContent: "space-around"
            }}
          >
            <View
              style={{
                borderRadius: 20,
                alignItems: "center"
              }}
            >
              {this.state.fontLoaded ? (
                <Text style={styles.header}>
                  Tranzip{"\n"} Transit Transformed{" "}
                </Text>
              ) : null}
              <Image
                source={require("./assets/Fast_support.png")}
                style={{ width: 200, height: 200, marginTop: 50 }}
              />
            </View>
            <TouchableOpacity
              onPress={this.toggleTimer}
              style={{
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.fontLoaded ? (
                <Text style={styles.button}>
                  {!this.state.timerStart ? "Start" : "Stop"}
                </Text>
              ) : null}
            </TouchableOpacity>
            <View style={styles.timer}>
              {this.state.fontLoaded ? (
                <Text style={{ fontFamily: "PT-Sans" }}>Timer Here</Text>
              ) : null}
              <Stopwatch
                msecs
                start={this.state.timerStart}
                reset={this.state.resetTimer}
                getTime={this.getFormattedTime}
              />
            </View>
          </LinearGradient>
        </View>
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F2FF",
    textAlign: "center",
    fontFamily: "PT-Sans"
  },
  button: {
    fontSize: 25,
    color: "#F5F2FF",
    width: 300,
    height: 70,
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ED6DA6",
    fontFamily: "PT-Sans"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  timer: {
    justifyContent: "space-around",
    textAlign: "center"
  }
});
