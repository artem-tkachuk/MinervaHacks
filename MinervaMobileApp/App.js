import React from "react";
import { StyleSheet, Text, View, Button, AlertIOS } from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timerStart: false
    };
  }
  toggleTimer = () => {
    const newState = !this.state.timerStart;
    this.setState({ timerStart: newState });
  };
  getFormattedTime = () => {
    return this.state.time;
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
          <Timer
            start={this.state.timerStart}
            // reset={this.state.timerReset}
            // options={options}
            // handleFinish={handleTimerComplete}
            getTime={this.getFormattedTime}
          />
          <Text>Timer Here</Text>
        </View>
      </View>
    );
  }
}

const options = {
  container: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
    width: 220
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: 7
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 100
  },
  timer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300
  }
});
