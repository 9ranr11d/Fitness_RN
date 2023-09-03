import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import RecordModal from "../Common/RecordModal";

function TimerRunning({navigation, route}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReservation, setIsReservation] = useState(false);

  const [timerCount, setTimerCount] = useState(route.params.restTime - 1);

  const tempRecord = useRef(route.params.tempRecord);

  const handleReservation = () => {
    setIsReservation(!isReservation);
  };

  useEffect(() => {
    timerCount > 0
      ? setTimeout(() => {
          setTimerCount(timerCount - 1) 
        }, 1000)
      : navigation.navigate(
          "TimerSetting",
          {
            isCompleted: true,
            tempRecord: tempRecord.current,
            isReservation: isReservation,
          }
        )
  }, [timerCount]);

  useEffect(() => {
    const prevTempRecord = {...tempRecord.current};
    prevTempRecord.numOfSets = prevTempRecord.numOfSets + 1;
    prevTempRecord.restTimesBtwSets.push(route.params.restTime.toString());
    tempRecord.current = prevTempRecord;
  }, []);

  return (
    <View style = {styles.background}>
      <View style={styles.numOfSetsBox}>
        <Text>
          {isReservation ? `[예약 됨] 운동 이름: ${tempRecord.current.exerciseName}` : ""}
        </Text>
        <Text style={styles.numOfSets}>
          세트 수 : {tempRecord.current.numOfSets}
        </Text>
      </View>

      <View style={styles.restTimeBox}>
        <Text style = {styles.restTime}>
          {Math.floor(timerCount / 60)} : {timerCount % 60}
        </Text>
      </View>

      <View style={styles.btnBox}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.btnStr}>
            임시 저장/{isReservation ? "예약 취소" : "예약"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnStr}>
            정지
          </Text>
        </TouchableOpacity>
      </View>

      <RecordModal
        isVisible={isModalVisible}
        data={tempRecord.current}
        setInVisible={() => {
          setIsModalVisible(false);
        }}
        saveRecord={(data) => {
          tempRecord.current = data;
          console.log("Temp Record", tempRecord.current);
        }}
        constraint={true}
        isScrollEnabled={true}
        isRecord={false}
        isReserve={true}
        changeReservation={handleReservation}
        reservation={isReservation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
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
  btnBox: {
    flex: 1,
  },
  btn: {
    flex: 1,
  },
  btnStr: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default TimerRunning;