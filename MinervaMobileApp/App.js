import React from "react";
import axios from "axios";
import { StyleSheet, Text, View, Button, AlertIOS } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      resetTimer: false
    };
    this.currentTime = 0;
  }
  toggleTimer = () => {
    const timerState = !this.state.timerStart;
    navigator.geolocation.getCurrentPosition(
      location => {
        const data = {
            geo: location, time: this.currentTime
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
      <View style={styles.container}>
        <Button
          title={!this.state.timerStart ? "Start" : "Stop"}
          onPress={this.toggleTimer}
          color="#5AB14C"
        />
        <View style={styles.timer}>
          <Text>Timer Here</Text>
          <Stopwatch
            msecs
            start={this.state.timerStart}
            reset={this.state.resetTimer}
            getTime={this.getFormattedTime}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 100
  },
  timer: {
    justifyContent: "space-around",
    textAlign: "center"
  }
});
