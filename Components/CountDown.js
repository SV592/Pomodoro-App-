import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

//Custom imports
import colors from "../Constants/colors";
import ButtonComponent from "./ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";

function CountDownTimer(props) {
  //Timer state
  const [onWork, setWork] = useState("");
  const [onBreak, setBreak] = useState("");
  const [onLongBreak, setLongBreak] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  //Acvitity state
  const [active, setActive] = useState("Working");

  //Checking input validity state
  const [inputCheck, setInputCheck] = useState("");

  //Timer key state
  const [key, setKey] = useState(1);

  //Animation state
  const [animate, setAnimate] = useState(false);

  //Modal screen state
  const [modalVisible, setModalVisible] = useState(false);

  Notifications.setNotificationChannelAsync("timer-finish", {
    name: "Timer Notifications",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "email-sound.wav",
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetbadge: false,
    }),
  });

  function handleSumbit() {
    setModalVisible(!modalVisible);
    //Check for the work input
    if (!onWork || !onBreak || !onLongBreak) {
      setInputCheck("To update enter all periods");
      //Checked Successfully
    } else {
      //Setting timer value based on current activity
      if (active === "Working") setCurrentTime(onWork);
      else if (active === "Break") setCurrentTime(onBreak);
      else if (active === "LongBreak") setCurrentTime(onLongBreak);
      setKey(currentTime);
      setInputCheck(null);
    }
  }

  //Handles timer setting after each timer completion
  function handleTimerComplete(active) {
    setActive(active);
    if (active === "Working") setCurrentTime(onWork)
    else if (active === "Break") setCurrentTime(onBreak)
    else if (active === "LongBreak") setCurrentTime(onLongBreak);

    if (key === 0) setKey(1)
    else setKey(0);

    setAnimate(false)
  }

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      {/* Timer */}
      <Text style={styles.actively}>{active}...</Text>
      {/*Reset button*/}
      <TouchableOpacity
        onPress={() => {
          setAnimate(false);
          if (key === 0) setKey(1)
          else setKey(0)
        }}
      >
        <Ionicons name="reload" size={30} color={colors.primaryColor} />
      </TouchableOpacity>
      <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={currentTime * 60}
        colors={["#ADE498"]}
        strokeWidth={6}
        trailColor={colors.lightgray}
        onComplete={() => {
          //Interchanging between work and break until it completes 7 iterations then it switches to a longbreak
          //Then repeats the process
          if (active === "Working") handleTimerComplete("Break")
          else if (active === "Break") handleTimerComplete("Working")
          else if (active === "LongBreak") handleTimerComplete("Working");

          //Handling local notification when a timer is complete
          Notifications.scheduleNotificationAsync({
            content: {
              title: `${active} Timer Complete`,
              body: `Switching to next period return when your're ready `,
            },
            trigger: {
              seconds: 0.5,
              channelId: "timer-finish",
            },
          });

        }}
        children={({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;

          return (
            <Animated.View style={styles.countDown}>
              <Text style={styles.timer}>
                {minutes}:{seconds}
              </Text>
            </Animated.View>
          );
        }}
      />

      {/* Settings */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.inputCheck}>{inputCheck}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(onWork) => {
                  setWork(onWork);
                }}
                placeholder="Work"
                keyboardType="numeric"
                value={onWork}
              />
              <TextInput
                style={styles.input}
                onChangeText={(onBreak) => {
                  setBreak(onBreak);
                }}
                placeholder="Break"
                keyboardType="numeric"
                value={onBreak}
              />
              <TextInput
                style={styles.input}
                onChangeText={(onLongBreak) => {
                  setLongBreak(onLongBreak);
                }}
                placeholder="Long-B"
                keyboardType="numeric"
                value={onLongBreak}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComponent
                title="Save"
                doSomething={() => {
                  handleSumbit();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonGridBottomContainer}>
        <TouchableOpacity onPress={() => setAnimate(true)}>
          <Ionicons name="play" size={30} color={colors.primaryColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="settings" size={30} color={colors.secondaryColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAnimate(false)}>
          <Ionicons name="pause" size={30} color={colors.red} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGridContainer}>
        <TouchableOpacity onPress={() => {
          if (active === "Working") {
            handleTimerComplete("Break");
          } else if (active === "Break") {
            handleTimerComplete("LongBreak");
          } else if (active === "LongBreak") {
            handleTimerComplete("Working");
          }
        }}>
          <Ionicons name="repeat" size={30} color={colors.secondaryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  countDown: {
    color: "black",
    fontFamily: "open-sans-bold",
    fontSize: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 67
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  heading: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    paddingTop: 10,
    color: colors.secondaryColor,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    left: 8
  },
  input: {
    padding: 15,
  },
  buttonContainer: {
    marginBottom: 20,
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "row",
  },
  inputCheck: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    color: colors.red
  },
  timer: {
    fontFamily: "open-sans-bold",
    color: colors.primaryColor,
    textAlign: "center",
    fontSize: 40
  },
  actively: {
    fontFamily: "open-sans-bold",
    fontSize: 30,
    textAlign: "center",
    color: colors.primaryColor,
    marginBottom: 10,
  },
  buttonGridContainer: {
    alignSelf: "center"
  },
  buttonGridBottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});

export default CountDownTimer;
