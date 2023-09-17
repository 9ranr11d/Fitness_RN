import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View,  Text, ScrollView, TouchableOpacity, TextInput, Button } from "react-native";
/* DB */
import realm from "../../db/realm";
/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { fetchRecord } from "../../../store/actions/recordAction"
/* Components */
import RecordModal from "../../components/RecordModal";

/**
 * 기록 검색/조회
 */
const Diary = () => {
  const dispatch = useDispatch();

  const recordReducer = useSelector(state => state.recordReducer);

  const [searchMode, setSearchMode] = useState(0);
  
  const [recordList, setRecordList] = useState([]);

  const [searchStr, setSearchStr] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  //기록 삭제
  const delRecord = obj => {
    try {
      realm.write(() => {
        realm.delete(obj);
      });
  
      dispatch(fetchRecord());
    }catch(error) {
      console.error("데이터 삭제 중 오류 발생 :", error);
    }
  };

  //기록 수정
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
        }
      })
    }catch(error) {
      console.error("데이터 업데이트 중 오류 발생 :", error);
    }
  }

  //검색 분류 설정
  const handleSearchMode = num => {
    setSearchMode(num);
  }

  //검색창
  const handleSearchInput = text => {
    setSearchStr(text);

    let searchResult = null;

    switch(searchMode) {
      case 0: //운동 이름
        searchResult = recordReducer.payload.filter(item =>
          item.exerciseName.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );

        break;
      case 1: //운동 부위
        searchResult = recordReducer.payload.filter(record =>
          record.muscleGroups.some(group => group.toLowerCase().includes(text.toLowerCase()))
        );

        break;
      default:
        searchResult = recordList;
        break;
    }

    setRecordList(searchResult)
  };

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

  useEffect(() => {
    setRecordList(recordReducer.payload);
  }, [recordReducer]);

  return(
    <View>
      <View>
        <Button title="이름" onPress={() => handleSearchMode(0)} />
        <Button title="부위" onPress={() => handleSearchMode(1)} />
      </View>

      <TextInput
        placeholder="검색"
        numberOfLines={1}
        value={searchStr}
        onChangeText={handleSearchInput}
      />

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
          </View>
        ))}
      </ScrollView>

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

export default Diary;