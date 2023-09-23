import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar as CalendarView } from "react-native-calendars"
/* DB */
import realm from "../../db/realm";
/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { fetchRecord } from "../../../store/actions/recordAction";
/* Utils */
import { getCurrentDate } from "../../utils/utils";
/* Components */
import RecordModal from "../../components/RecordModal";

/**
 * 달력으로 기록 보기
 */
const Calendar = () => {
  const dispatch = useDispatch();

  const { year, month, day } = getCurrentDate();
  
  const recordReducer = useSelector(state => state.recordReducer);

  // 달력에 표시
  const [selDate, setSelDate] = useState(`${year}-${month}-${day}`);  
  const [markedDates, setMarkedDates] = useState({});

  const allRecord = useRef([]); 

  const uniqueNum = useRef(0);

  // 해당 날짜 기록
  const [selDateRecord, setSelDateRecord] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const defaultMarkedDates = useRef({});

  const selRecord = useRef({
    id: null,
    date: "",
    muscleGroups: [],
    exerciseName: "",
    numOfSets: 0,
    weights: [],
    repsPerSet: [],
    restTimesBtwSets: [],
  });

  // 운동 부위별 표시할 마커 색상
  const muscleGroupColors = {
    chest: "red",
    back: "orange",
    legs: "yellow",
    abs: "green",
    shoulders: "blue",
    biceps: "navy",
    triceps: "purple",
    etc: "black",
  };

  // 선택한 날짜 표시
  const handleSelDate = date => {
    const prevMarkedDates = {...defaultMarkedDates.current};

    if(prevMarkedDates[date])
      prevMarkedDates[date] = {...prevMarkedDates[date], selected: true}
    else
      prevMarkedDates[date] = {selected: true}

    setMarkedDates(prevMarkedDates);
  };

  // 선택한 날짜에 기록들 조회
  const handleSelDateRecord = date => {
    const tempSelDateRecord = allRecord.current.reduce((unique, record) => {
      if(date === record.date)
        unique.push(record);

      return unique;
    }, []);

    setSelDateRecord(tempSelDateRecord);
  };

   // 기록 삭제
   const delRecord = obj => {
    try {
      const foundRecord = realm.objects("WorkoutRecord").filtered("id = $0", obj.id)[0];

      realm.write(() => {
        if(foundRecord) {
          realm.delete(foundRecord);

          dispatch(fetchRecord());
          console.log("데이터 삭제 완료.");
        }
      });
    }catch(error) {
      console.error("데이터 삭제 중 오류 발생 :", error);
    }
  };

  // 기록 수정
  const updateRecord = data => {
    try {
      const foundRecord = realm.objects("WorkoutRecord").filtered("id = $0", selRecord.current.id)[0];

      realm.write(() => {
        if(foundRecord) {
          foundRecord.date = data.date;
          foundRecord.muscleGroups = data.muscleGroups;
          foundRecord.exerciseName = data.exerciseName;
          foundRecord.numOfSets = data.numOfSets;
          foundRecord.weights = data.weights;
          foundRecord.repsPerSet = data.repsPerSet;
          foundRecord.restTimesBtwSets = data.restTimesBtwSets;

          dispatch(fetchRecord());
          console.log("데이터 업데이트 완료.");
        }
      })
    }catch(error) {
      console.error("데이터 업데이트 중 오류 발생 :", error);
    }
  };

  useEffect(() => {
    handleSelDate(selDate);
    handleSelDateRecord(selDate);
  }, [selDate]);

  const initCalendar = () => {
    defaultMarkedDates.current = {};

    allRecord.current.forEach(record => {
      const { date, muscleGroups } = record;
  
      if(!defaultMarkedDates.current[date])
        defaultMarkedDates.current[date] = {dots: []};
  
      muscleGroups.forEach(group => {
        const color = muscleGroupColors[group];
        defaultMarkedDates.current[date].dots.push({key: `${date}${group}${uniqueNum.current++}`, color: color});
      });
  
      setMarkedDates(defaultMarkedDates.current);
    });

    handleSelDate(selDate);
    handleSelDateRecord(selDate);
  };

  useEffect(() => {
    allRecord.current = recordReducer.payload;
    initCalendar();
  }, [recordReducer]);

  return(
    <View>
      <CalendarView
        onDayPress={day => {
          console.log("Selected day :", day.dateString);
          setSelDate(day.dateString);
        }}
        markedDates={markedDates}
        enableSwipeMonths={true}
        markingType={"multi-dot"}
      />

      <View>
        <Text>{selDate}</Text>
        <Text>--------------------------------------</Text>
        
        <ScrollView style={{height: "50%"}}>
          {
            selDateRecord.length !== 0
              ? selDateRecord.map((record, idx) => (
                <View key={idx}>
                  {
                    record.isValid()
                      ? 
                        <>
                          <Text>Muscle Groups: {record.muscleGroups.join(", ")}</Text>
                          <Text>Exercise Name: {record.exerciseName}</Text>
                          <Text>Num of Sets: {record.numOfSets}</Text>
                          <Text>Weight: {record.weights.join(", ")}</Text>
                          <Text>Repetitions Per Set: {record.repsPerSet.join(", ")}</Text>
                          <Text>Rest Times Between Sets: {record.restTimesBtwSets.join(", ")}</Text>
                          <Text>--------------------------------------</Text>

                          <TouchableOpacity
                            onPress={() => {
                              const tempRecord = {
                                id: record.id,
                                date: record.date,
                                muscleGroups: [...record.muscleGroups],
                                exerciseName: record.exerciseName,
                                numOfSets: record.numOfSets,
                                weights: [...record.weights],
                                repsPerSet: [...record.repsPerSet],
                                restTimesBtwSets: [...record.restTimesBtwSets]
                              };

                              selRecord.current = tempRecord;

                              setIsModalVisible(true);
                            }}
                          >
                            <Text>
                              | 수정 |
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => delRecord(record)}
                          >
                            <Text>
                              | 삭제 |
                            </Text>
                          </TouchableOpacity>
                          <Text>--------------------------------------</Text>
                        </>
                      : <Text>삭제된 기록입니다.</Text>
                    }
                </View>
              ))
              : <Text>기록이 없습니다.</Text>
          }
        </ScrollView>
      </View>

      <RecordModal
        isVisible={isModalVisible}
        data={selRecord.current}
        setInVisible={() => setIsModalVisible(false)}
        saveRecord={data => {
          console.log("Return Data :", data);
          updateRecord(data);
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

});

export default Calendar;