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

  const handleNumOfSetsPlus = () => {
    if(numOfSets < 10)
      setNumOfSets(numOfSets + 1)
    else
      Alert.alert("Error", "세트 수가 10세트를 넘었습니다.");
  }

  const handleNumOfSetsMinus = () => {
    if(numOfSets > 0)
      setNumOfSets(numOfSets - 1)
    else
      Alert.alert("Error", "세트 수가 없습니다.");
  }

  // const exerciseRecord = useRef({
  //   date: "",
  //   muscleGroups: [],
  //   exerciseName: "",
  //   numOfSets: [],
  //   weights: [],
  //   repsPerSet: [],
  //   restTimesBtwSets: [],
  // });

  const numPickerStyles = {
    oneScrollHeight: 50,
    fontSize: 40,
  };

  const mitArr = ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", ""];
  const secArr = ["", "00", "30", ""];
  
  const recordData = {
    numOfSets: numOfSets,
  }

  const saveRecord = (record) => {
    realm.write(() => {
      realm.create("WorkoutRecord", record);
    });
  };

  useEffect(() => {
    if(route.params?.isCompleted)
      handleNumOfSetsPlus();
  }, [route.params]);

  return (
    <View style={styles.background}>
      <View style={styles.numOfSetsBox}>
        <Text style={styles.numOfSets}>
          세트 수 : {numOfSets}
        </Text>

        <View>
          <TouchableOpacity
            onPress={handleNumOfSetsPlus}
          >
            <Text style={styles.handleNumOfSets}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNumOfSetsMinus}
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
          console.log("Record", data);
          saveRecord(data);
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