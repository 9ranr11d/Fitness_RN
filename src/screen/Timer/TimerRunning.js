import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function TimerRunning({navigation, route}) {
  const [timerCount, setTimerCount] = useState(route.params.restTime - 1);

  useEffect(() => {
    timerCount > 0
      ? setTimeout(() => {
          setTimerCount(timerCount - 1) 
        }, 1000)
      : navigation.navigate("TimerSetting", {isCompleted: true})
  }, [timerCount]);

  return (
    <View style = {styles.bgBox}>
      <View style={styles.numOfSetsBox}>
        <Text style={styles.numOfSets}>
          세트 수 : {route.params.numOfSets + 1}
        </Text>
      </View>

      <View style={styles.restTimeBox}>
        <Text style = {styles.restTime}>
          {Math.floor(timerCount / 60)} : {timerCount % 60}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnStr}>
          정지
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bgBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  numOfSetsBox: {
    flex: 1,
    justifyContent: "center",
  },
  numOfSets: {
    fontSize: 20,
  },
  restTimeBox: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  restTime: {
    fontSize: 40,
  },
  btn: {
    flex: 1,
  },
  btnStr: {
    fontSize: 15,
  },
});

export default TimerRunning;