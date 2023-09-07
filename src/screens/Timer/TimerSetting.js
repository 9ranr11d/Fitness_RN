import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import realm from "../../db/realm";
import { getCurrentDate } from "../../utils/utils";
import RecordModal from "../../components/RecordModal";
import NumPicker from "../../components/NumPicker";

const TimerSetting = ({navigation, route}) => {
  const { year, month, day } = getCurrentDate();
  
  const [currentMit, setCurrentMit] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);

  const [numOfSets, setNumOfSets] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState({
    isRecord: false,
    isTempRecord: false,
  });

  const handleNumOfSetsPlus = () => {
    if(numOfSets < 10) {
      setNumOfSets(numOfSets + 1);
      
      const prevTempRecord = {...tempRecord.current};
      prevTempRecord.numOfSets = prevTempRecord.numOfSets + 1;
      tempRecord.current = prevTempRecord;
    }
    else
      Alert.alert("Error", "세트 수가 10세트를 넘었습니다.");
  };

  const handleNumOfSetsMinus = () => {
    if(numOfSets > 0) {
      setNumOfSets(numOfSets - 1);
      const prevTempRecord = {...tempRecord.current};
      prevTempRecord.numOfSets = prevTempRecord.numOfSets - 1;
      tempRecord.current = prevTempRecord;
    }
    else
      Alert.alert("Error", "세트 수가 없습니다.");
  };
  
  // const changeTenFomat = num => {
  //   let result = num;
  //   if(num < 10)
  //     result = `0${num}`;

  //   return result;
  // };

  const tempRecord = useRef({
    date: `${year}-${month}-${day}`,
    muscleGroups: [],
    exerciseName: "",
    numOfSets: 0,
    weights: [],
    repsPerSet: [],
    restTimesBtwSets: [],
  });

  const numPickerStyles = {
    oneScrollHeight: 50,
    fontSize: 40,
  };

  const mitArr = ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", ""];
  const secArr = ["", "00", "30", ""];

  const saveRecord = (record) => {
    Alert.alert("기록", `'${record.exerciseName}'으로 기록되었습니다.`);
    
    const result = {
      ...record,
      id: new Realm.BSON.ObjectId(),
    }
    realm.write(() => {
      realm.create("WorkoutRecord", result);
    });

    tempRecord.current = {
      date: `${year}-${month}-${day}`,
      muscleGroups: [],
      exerciseName: "",
      numOfSets: 0,
      weights: [],
      repsPerSet: [],
      restTimesBtwSets: [],
    }

    setNumOfSets(0);
  };

  useEffect(() => {
    if(route.params?.isCompleted) {
      handleNumOfSetsPlus();
      
      tempRecord.current = {...route.params?.tempRecord};
      if(route.params?.isReservation) {
        saveRecord(tempRecord.current);
      }
    }
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
        <View style={styles.recordBtnBox}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsModalVisible({
                isRecord: isModalVisible.isRecord,
                isTempRecord: true,
              });
            }}
          >
            <Text style={styles.btnStr}>
              임시 저장
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              numOfSets === 0
                ? Alert.alert("실패", "세트 수가 없습니다.")
                : setIsModalVisible({
                    isRecord: true,
                    isTempRecord: isModalVisible.isTempRecord,
                  });
            }}
          >
            <Text style={styles.btnStr}>
              기록
            </Text>
          </TouchableOpacity>
        </View>

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
                    tempRecord: tempRecord.current,
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
        isVisible={isModalVisible.isTempRecord}
        data={tempRecord.current}
        setInVisible={() => {
          setIsModalVisible({
            isRecord: isModalVisible.isRecord,
            isTempRecord: false,
          });
        }}
        saveRecord={(data) => {
          tempRecord.current = data;
          console.log("Temp Record", tempRecord.current);
          
          setNumOfSets(data.numOfSets);
        }}
        constraint={false}
        isScrollEnabled={false}
        isRecord={false}
        isReserve={false}
      />

      <RecordModal
        isVisible={isModalVisible.isRecord}
        data={tempRecord.current}
        setInVisible={() => {
          setIsModalVisible({
            isRecord: false,
            isTempRecord: isModalVisible.isTempRecord,
          });
        }}
        saveRecord={(data) => {
          console.log("Record", data);
          saveRecord(data);
        }}
        constraint={false}
        isScrollEnabled={true}
        isRecord={true}
        isReserve={false}
      />
    </View>
  );
};

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
    width: "100%",
    alignItems: "center"
  },
  recordBtnBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    flex: 1,
  },
  btnStr: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default TimerSetting;