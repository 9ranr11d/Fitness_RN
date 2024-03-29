import React, { useEffect, useState, useRef } from "react";
import { Modal, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
/* Components */
import NumPicker from "./NumPicker";

/**
 * 기록, 수정, 임시저장
 * @param {Function} props.saveRecord 기록 버튼 클릭 시
 * @param {boolean} props.constraint 휴식시간 수정 가능 여부
 * @param {boolean} props.isScrollEnabled 세트 수 수정 가능 여부
 * @param {boolean} props.isRecord 기록 버튼 유무
 * @param {Function} props.changeReservation 예약 버튼 클릭 시
 * @param {boolean} props.isReserve 예약 버튼 유무
 */
const RecordModal = props => {
  // 드롭 다운 메뉴 props
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selMuscleGroups, setSelMuscleGroups] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([
    { label: "가슴", value: "chest" },
    { label: "등", value: "back" },
    { label: "하체", value: "legs" },
    { label: "복근", value: "abs" },
    { label: "어깨", value: "shoulders" },
    { label: "이두", value: "biceps" },
    { label: "삼두", value: "triceps" },
    { label: "기타", value: "etc" },
  ]);

  const [numOfSets, setNumOfSets] = useState(0);

  const [exerciseName, setExerciseName] = useState("");

  const [trainingSession, setTrainingSession] = useState({
    weights: [],
    repsPerSet: [],
    restTimesBtwSets: [],
  });

  const numPickerStyles = {
    oneScrollHeight: 30,
    fontSize: 15,
  };

  const tenArr = [ "", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", ""];

  // 세트 수에 따라 TextInput 셋팅
  const initTrainingSession = () => {
    const _trainingSession = [];

    for(let i = 0; i < numOfSets; i++) {
      _trainingSession.push(
        <View key={i} style={styles.line}>
          <Text style={styles.numOfSet}>
            {i + 1}
          </Text>

          <TextInput
            placeholder="무게"
            keyboardType="number-pad"
            numberOfLines={1}
            maxLength={3}
            style={styles.trainingSessionInput}
            value={trainingSession.weights[i]}
            onChangeText={text => {
              const prevTrainingSession = {...trainingSession};
              prevTrainingSession.weights[i] = text;
              setTrainingSession(prevTrainingSession);
            }}
          />

          <TextInput
            placeholder="횟수"
            keyboardType="number-pad"
            numberOfLines={1}
            maxLength={3}
            style={styles.trainingSessionInput}
            value={trainingSession.repsPerSet[i]}
            onChangeText={text => {
              const prevTrainingSession = {...trainingSession};
              prevTrainingSession.repsPerSet[i] = text;
              setTrainingSession(prevTrainingSession);
            }}
          />

          <TextInput
            placeholder="휴식 시간"
            keyboardType="number-pad"
            numberOfLines={1}
            maxLength={3}
            style={styles.trainingSessionInput}
            value={trainingSession.restTimesBtwSets[i]}
            onChangeText={text => {
              const prevTrainingSession = {...trainingSession};
              prevTrainingSession.restTimesBtwSets[i] = text;
              setTrainingSession(prevTrainingSession);
            }}
            editable={!props.constraint}
          />
        </View>
      );
    }

    return _trainingSession;
  };

  const handleReset = () => {
    setSelMuscleGroups([]);
    setExerciseName("");
    setNumOfSets(0);
    setTrainingSession({
      weights: [],
      repsPerSet: [],
      restTimesBtwSets: [],
    });
  };

  const handleSetData = () => {
    setSelMuscleGroups(props.data.muscleGroups);
    setExerciseName(props.data.exerciseName);
    setNumOfSets(props.data.numOfSets);
    setTrainingSession({
      weights: props.data.weights,
      repsPerSet: props.data.repsPerSet,
      restTimesBtwSets: props.data.restTimesBtwSets,
    });
  };

  useEffect(() => {
    handleSetData();
  }, [props.isVisible]);

  return(
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.setInVisible();
      }}
      style={styles.modal}
    >
      <View style={styles.background}>
        <View style={styles.content}>
          <Text>기록</Text>

          <Text>날짜</Text>

          <Text>{props.data.date}</Text>
          
          <Text>운동 부위</Text>

          <View>
            <DropDownPicker
              open={dropDownOpen}
              value={selMuscleGroups}
              items={muscleGroups}
              setOpen={setDropDownOpen}
              setValue={setSelMuscleGroups}
              setItems={setMuscleGroups}
              multiple={true}
              min={1}
              max={muscleGroups.length}
              placeholder="운동한 부위를 선택해주세요."
              mode="BADGE"
              showBadgeDot={false}
            />
          </View>

          <Text>운동 이름</Text>

          <TextInput
            placeholder="운동 이름"
            value={exerciseName}
            onChangeText={setExerciseName}
          />

          <Text>세트 수-----{numOfSets}</Text>

          <NumPicker
            numArr={tenArr}
            styles={numPickerStyles}
            currentNum={num => setNumOfSets(num)}
            isScrollEnabled={!props.constraint}
            initPosition={numOfSets}
          />

          <Text>무게 / 횟수 / 쉬는 시간</Text>

          <ScrollView style={styles.trainingSessionScroll}>
            {initTrainingSession()}
          </ScrollView>

          <View style={styles.line}>
            {
              props.isReserve
              ? (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    Alert.alert("예약", props.reservation ? "예약 취소되었습니다." : "예약되었습니다.");
                    props.changeReservation();
                    props.saveRecord({
                      date: props.data.date,
                      muscleGroups: selMuscleGroups,
                      exerciseName: exerciseName,
                      numOfSets: numOfSets,
                      weights: trainingSession.weights,
                      repsPerSet: trainingSession.repsPerSet,
                      restTimesBtwSets: trainingSession.restTimesBtwSets,
                    });

                    props.setInVisible();
                    
                    handleReset();
                  }}
                >
                  <Text>{props.reservation ? "예약 취소" : "예약"}</Text>
                </TouchableOpacity>
              )
              : null
            }
            

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                /**
                 * 운동 부위, 운동 이름, 운동 무게, 운동 세트 당 횟수, 세트 사이 쉬는 시간이
                 * 빈값이면 "0"으로 채움
                 */
                let resultMuscleGroups = {};
                let resultExerciseName = "";
                let resultWeights = [];
                let resultRepsPerSet = [];
                let resultRestTimesBtwSets = [];

                if(selMuscleGroups.length !== 0)
                  resultMuscleGroups = selMuscleGroups;
                else
                  resultMuscleGroups = ["etc"];

                if(exerciseName !== "")
                  resultExerciseName = exerciseName;
                else
                  resultExerciseName = "Temp exercise name";

                for(let i = 0; i < numOfSets; i++) {
                  trainingSession.weights[i] === undefined
                    ? resultWeights[i] = "0"
                    : resultWeights[i] = trainingSession.weights[i];

                  trainingSession.repsPerSet[i] === undefined
                    ? resultRepsPerSet = "0"
                    : resultRepsPerSet = trainingSession.repsPerSet[i];
                  
                  trainingSession.restTimesBtwSets = trainingSession.restTimesBtwSets[i]
                    ? resultRestTimesBtwSets = "0"
                    : resultRestTimesBtwSets = trainingSession.restTimesBtwSets[i];
                };

                props.saveRecord({
                  date: props.data.date,
                  muscleGroups: resultMuscleGroups,
                  exerciseName: resultExerciseName,
                  numOfSets: numOfSets,
                  weights: resultWeights,
                  repsPerSet: resultRepsPerSet,
                  restTimesBtwSets: resultRestTimesBtwSets,
                });

                props.setInVisible();

                handleReset();
              }}
            >
              <Text>{props.isRecord ? "기록" : "임시 저장"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.setInVisible();

                handleReset();
              }}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  content: {
    width: 300,
    height: 550,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  line: {
    flex: 1,
    flexDirection: "row",
  },
  trainingSessionScroll: {
    width: "100%",
    height: 100,
  },
  trainingSessionInput: {
    flex: 2,
    textAlign: "center",
  },
  numOfSet: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  btn: {
    padding: 10,
  },
});

export default RecordModal;