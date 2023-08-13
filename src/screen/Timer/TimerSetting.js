import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import realm from "../../db/realm";
import RecordModal from "../Common/RecordModal";
import NumPicker from "../Common/NumPicker";

function TimerSetting({navigation, route}) {
  const [currentMit, setCurrentMit] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);

  const [numOfSets, setNumOfSets] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const tempRecord = useRef({
    date: "",
    muscleGroup: [],
    exerciseName: "",
    numOfSets: [],
    weight: [],
    repPerSet: [],
    restTimeBtwSets: [],
  });

  const numPickerStyles = {
    oneScrollHeight: 50,
    fontSize: 40,
  };

  const mitArr = ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", ""];
  const secArr = ["", "00", "30", ""];
  
  const recordData = {
    numOfSets: numOfSets,
  }

  const saveRecord = () => {
    realm.write(() => {
      realm.create("WorkoutRecord", tempRecord);
    });
  };

  useEffect(() => {
    if(route.params?.isCompleted)
      setNumOfSets(numOfSets + 1)
  }, [route.params]);

  return (
    <View style={styles.background}>
      <View style={styles.numOfSetsBox}>
        <Text style={styles.numOfSets}>
          세트 수 : {numOfSets}
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              setNumOfSets(numOfSets + 1)
            }}
          >
            <Text style={styles.handleNumOfSets}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setNumOfSets(numOfSets - 1)
            }}
          >
            <Text style={styles.handleNumOfSets}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.restTimeBox}>
        <NumPicker
          numArr={mitArr}
          styles={numPickerStyles}
          currentNum={(num) => {
            setCurrentMit(num);
          }}
        />

        <NumPicker
          numArr={secArr}
          styles={numPickerStyles}
          currentNum={(num) => {
            setCurrentSec(num);
          }}
        />
      </View>

      <View style={styles.btnBox}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            numOfSets === 0
              ? Alert.alert("실패", "세트 수가 없습니다.")
              : setIsModalVisible(true);
          }}
        >
          <Text style={styles.btnStr}>
            기록
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            currentMit === 0 && currentSec === 0
              ? Alert.alert("실패", "쉬는 시간을 설정해 주세요.")
              : navigation.navigate(
                  "TimerRunning",
                  {
                    restTime: (Number(mitArr[currentMit + 1]) * 60) + Number(secArr[currentSec + 1]),
                    numOfSets: numOfSets,
                  }
                );
          }}
        >
          <Text style={styles.btnStr}>
            시작
          </Text>
        </TouchableOpacity>
      </View>
      <RecordModal
        isVisible={isModalVisible}
        data={recordData}
        setInVisible={() => {
          setIsModalVisible(false);
        }}
        saveRecord={(data) => {
          tempRecord(data)
        }}
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  numOfSets: {
    fontSize: 20,
  },
  handleNumOfSets: {
    fontSize: 20,
  },
  restTimeBox: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  btnBox: {
    flex: 1,
  },
  btn: {
    flex: 1,
  },
  btnStr: {
    fontSize: 20,
  },
});

export default TimerSetting;