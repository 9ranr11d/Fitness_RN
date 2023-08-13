import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import NumPicker from "./NumPicker";

const RecordModal = (props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [selMuscleGroups, setSelMuscleGroups] = useState([]);
  const [smuscleGroups, setMuscleGroups] = useState([
    { label: "가슴", value: "chest" },
    { label: "등", value: "back" },
    { label: "하체", value: "legs" },
    { label: "복근", value: "abs" },
    { label: "어깨", value: "shoulders" },
    { label: "이두", value: "biceps" },
    { label: "삼두", value: "triceps" },
  ]);

  const [numOfSets, setNumOfSets] = useState(0);

  const [exerciseName, setExerciseName] = useState("");

  const [trainingSession, setTrainingSession] = useState({
    weights: [],
    reps: [],
    restTimes: [],
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const numPickerStyles = {
    oneScrollHeight: 30,
    fontSize: 15,
  }

  const tenArr = [ "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", ""];

  const initTrainingSession = () => {
    const _trainingSession = [];

    for(let i = 0; i < numOfSets + 1; i++) {
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
            onChangeText={(text) => {
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
            value={trainingSession.reps[i]}
            onChangeText={(text) => {
              const prevTrainingSession = {...trainingSession};
              prevTrainingSession.reps[i] = text;
              setTrainingSession(prevTrainingSession);
            }}
          />

          <TextInput
            placeholder="휴식 시간"
            keyboardType="number-pad"
            numberOfLines={1}
            maxLength={3}
            style={styles.trainingSessionInput}
            value={trainingSession.restTimes[i]}
            onChangeText={(text) => {
              const prevTrainingSession = {...trainingSession};
              prevTrainingSession.restTimes[i] = text;
              setTrainingSession(prevTrainingSession);
            }}
          />
        </View>
      );
    }

    return _trainingSession;
  }

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

          <View style={styles.line}>
            <Text>날짜</Text>
            <Text>{year}-{month}-{day}</Text>
          </View>
          
          <View style={styles.line}>
            <Text>운동 부위</Text>

            <View>
              <DropDownPicker
                open={dropDownOpen}
                value={selMuscleGroups}
                items={smuscleGroups}
                setOpen={setDropDownOpen}
                setValue={setSelMuscleGroups}
                setItems={setMuscleGroups}
                multiple={true}
                min={1}
                max={smuscleGroups.length}
                placeholder="운동한 부위를 선택해주세요."
                mode="BADGE"
                showBadgeDot={false}
              />
            </View>
          </View>

          <View style={styles.line}>
            <Text>운동 이름</Text>
            <TextInput
              placeholder="운동 이름"
              value={exerciseName}
              onChangeText={setExerciseName}
            />
          </View>

          <View style={styles.line}>
            <Text>세트 수</Text>

            <NumPicker
              numArr={tenArr}
              styles={numPickerStyles}
              currentNum={(num) => {
                setNumOfSets(num);
              }}
            />
          </View>

          <View style={styles.line}>
            <Text>무게/횟수{numOfSets}</Text>

            <ScrollView>
              {initTrainingSession()}
            </ScrollView>
          </View>

          <View style={styles.line}>
            <TouchableOpacity
              onPress={() => {
                props.saveRecord({
                  id: new Realm.BSON.ObjectId(),
                  date: `${year}-${month}-${day}`,
                  muscleGroups: selMuscleGroups,
                  exerciseName: exerciseName,
                  numOfSets: numOfSets + 1,
                  weights: trainingSession.weights,
                  repsPerSet: trainingSession.reps,
                  restTimesBtwSets: trainingSession.restTimes,
                })
              }}
            >
              <Text>기록</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={props.setInVisible}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  content: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  line: {
    flex: 1,
    flexDirection: "row",
  },
  trainingSessionInput: {
    flex: 2,
    // borderWidth: 1,
    // borderColor: "#000",
    textAlign: "center",
  },
  numOfSet: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#000",
    textAlign: "center",
  }
});

export default RecordModal;