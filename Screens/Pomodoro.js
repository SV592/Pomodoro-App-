import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { color } from "react-native-reanimated";

//Custom imports
import CountDownTimer from "../Components/CountDown";
import colors from "../Constants/colors";

function Pomodoro(props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Timer</Text>
      <View style={styles.centeredView}>
        <View style={styles.countdown}>
          <CountDownTimer />
        </View>
        <View style={styles.activity}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    padding: 8,
    color: "#fff",
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginHorizontal: 90,
    flex: 1,
    marginTop: 300,
  },
  buttonGridContainer: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  buttonGridBottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countdown: {
    flex: 1,
    justifyContent: "center"
  },
  activity: {
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default Pomodoro;
