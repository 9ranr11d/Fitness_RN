import React from "react";
import { StyleSheet, View,  Text, ScrollView, TouchableOpacity } from "react-native";
/* DB */
import realm from "../../db/realm";
/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { fetchRecord } from "../../../store/actions/recordAction"

/**
 * 기록 검색/조회
 */
const Diary = () => {
  const dispatch = useDispatch();

  const recordList = useSelector(state => state.recordReducer.payload);

  //기록 삭제
  const delRecord = (obj) => {
    realm.write(() => {
      realm.delete(obj);
    });
    dispatch(fetchRecord());
  };

  return(
    <View>
      <ScrollView>
        <Text>웨이트 운동 기록</Text>
        
        <Text>--------------------------------------</Text>
        {recordList.map((record, idx) => (
          <View key={idx}>
            <Text>Id: {record.id.toString()}</Text>
            <Text>Date: {record.date}</Text>
            <Text>Muscle Groups: {record.muscleGroups.join(", ")}</Text>
            <Text>Exercise Name: {record.exerciseName}</Text>
            <Text>Num of Sets: {record.numOfSets}</Text>
            <Text>Weight: {record.weights.join(", ")}</Text>
            <Text>Repetitions Per Set: {record.repsPerSet.join(", ")}</Text>
            <Text>Rest Times Between Sets: {record.restTimesBtwSets.join(", ")}</Text>
            <Text>--------------------------------------</Text>
            <TouchableOpacity
              onPress={() => {
                delRecord(record)
              }}
            >
              <Text>
                | 삭제 |
              </Text>
            </TouchableOpacity>
            <Text>--------------------------------------</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Diary;