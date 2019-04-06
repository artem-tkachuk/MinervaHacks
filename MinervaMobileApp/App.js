import React from "react";
import { StyleSheet, Text, View, Button, AlertIOS } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }
  onPressLearnMore = () => {
    AlertIOS.alert("Sync Complete", "All your data are belong to us.");
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Im Waiting For The Bus (Start Button)"}
          onPress={this.onPressLearnMore}
          color="#5AB14C"
        />
        <View style={styles.timer}>
          <Text>{this.state.time}</Text>
          <Text>Timer Here</Text>
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300
  }
});
