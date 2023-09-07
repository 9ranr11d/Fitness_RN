import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import realm from "../../db/realm";
import { getCurrentDate } from "../../utils/utils";
import { Calendar as _Calendar } from "react-native-calendars"

const Calendar = () => {
  const { year, month, day } = getCurrentDate();
  
  const recordList = realm.objects("WorkoutRecord");

  const [selDate, setSelDate] = useState(`${year}-${month}-${day}`);  

  const [markedDates, setMarkedDates] = useState({});
  const [selDateRecord, setSelDateRecord] = useState([]);

  const defaultMarkedDates = useRef({});

  const muscleGroupColors = {
    chest: "red",
    back: "orange",
    legs: "yellow",
    abs: "green",
    shoulders: "blue",
    biceps: "navy",
    triceps: "purple",
    default: "black",
  };

  const handleSelDate = date => {
    const prevMarkedDates = {...defaultMarkedDates.current};

    if(prevMarkedDates[date])
      prevMarkedDates[date] = {...prevMarkedDates[date], selected: true}
    else
      prevMarkedDates[date] = {selected: true}

    setMarkedDates(prevMarkedDates);
  };

  const handleSelDateRecord = date => {
    const tempSelDateRecord = recordList.reduce((unique, record) => {
      if(date === record.date)
        unique.push(record);

      return unique;
    }, []);

    setSelDateRecord(tempSelDateRecord);
  }

  useEffect(() => {
    handleSelDate(selDate);
    handleSelDateRecord(selDate);
  }, [selDate]);

  useEffect(() => {
    defaultMarkedDates.current = {};
    
    recordList.forEach(record => {
      const { date, muscleGroups } = record;
  
      if(!defaultMarkedDates.current[date])
        defaultMarkedDates.current[date] = {dots: []};
  
      muscleGroups.forEach(group => {
        const color = muscleGroupColors[group] || muscleGroupColors.default;
        defaultMarkedDates.current[date].dots.push({key: `${date}${group}`, color: color});
      });
  
      setMarkedDates(defaultMarkedDates.current);
    });

    handleSelDate(selDate);
  }, []);

  return(
    <View>
      <_Calendar
        onDayPress={day => {
          console.log("Selected day :", day.dateString);
          setSelDate(day.dateString);
        }}
        markedDates={markedDates}
        enableSwipeMonths={true}
        markingType={"multi-dot"}
      />

      <View>
        <Text>{selDate || "없음"}</Text>
        <Text>--------------------------------------</Text>

        {selDateRecord.map((record, idx) => (
          <View key={idx}>
            <Text>Muscle Groups: {record.muscleGroups.join(", ")}</Text>
            <Text>Exercise Name: {record.exerciseName}</Text>
            <Text>Num of Sets: {record.numOfSets}</Text>
            <Text>Weight: {record.weights.join(", ")}</Text>
            <Text>Repetitions Per Set: {record.repsPerSet.join(", ")}</Text>
            <Text>Rest Times Between Sets: {record.restTimesBtwSets.join(", ")}</Text>
            <Text>--------------------------------------</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Calendar;