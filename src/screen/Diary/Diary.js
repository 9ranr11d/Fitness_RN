import React, { useState, useEffect } from "react";
import { StyleSheet, View,  Text, ScrollView, TouchableOpacity } from "react-native";
import realm from "../../db/realm";

function Diary() {
  const recordList = realm.objects("WorkoutRecord");

  const delRecord = (obj) => {
    realm.write(() => {
      realm.delete(obj);
    });
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
}

const styles = StyleSheet.create({

});

export default Diary;