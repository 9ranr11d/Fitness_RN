import React from "react";
import { StyleSheet, View,  Text } from "react-native";
import realm from "../../db/realm";

function Calendar() {
  const allWorkouts = realm.objects('WorkoutRecord');

  return(
    <View>
      <Text>웨이트 운동 기록</Text>
      <Text>--------------------------------------</Text>
      {allWorkouts.map((workout, index) => (
        <View key={index}>
          <Text>Id: {workout.id.toString()}</Text>
          <Text>Date: {workout.date}</Text>
          <Text>Muscle Groups: {workout.muscleGroups.join(", ")}</Text>
          <Text>Exercise Name: {workout.exerciseName}</Text>
          <Text>Num of Sets: {workout.numOfSets}</Text>
          <Text>Weight: {workout.weights.join(", ")}</Text>
          <Text>Repetitions Per Set: {workout.repsPerSet.join(", ")}</Text>
          <Text>Rest Times Between Sets: {workout.restTimesBtwSets.join(", ")}</Text>
          <Text>--------------------------------------</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Calendar;