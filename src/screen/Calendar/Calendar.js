import React from "react";
import { StyleSheet, View,  Text } from "react-native";
import realm from "../../db/realm";

function Calendar() {
  const allWorkouts = realm.objects('WorkoutRecord');

  return(
    <View>
      <Text>웨이트 운동 기록</Text>
      {allWorkouts.map((workout, index) => (
        <View key={index}>
          <Text>Id: {workout.id}</Text>
          <Text>Muscle Group: {workout.muscleGroup}</Text>
          <Text>Exercise Name: {workout.exerciseName}</Text>
          <Text>Num of Sets: {workout.numOfSets}</Text>
          <Text>Repetitions Per Set: {workout.repPerSet}</Text>
          <Text>Rest Time Between Sets: {workout.restTimeBtwSets}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Calendar;