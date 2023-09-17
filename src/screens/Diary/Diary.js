import React, { useState, useEffect } from "react";
import { StyleSheet, View,  Text, ScrollView, TouchableOpacity, TextInput, Button } from "react-native";
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

  const recordReducer = useSelector(state => state.recordReducer);

  const [searchMode, setSearchMode] = useState(0);
  
  const [recordList, setRecordList] = useState([]);

  const [searchStr, setSearchStr] = useState("");

  //기록 삭제
  const delRecord = (obj) => {
    realm.write(() => {
      realm.delete(obj);
    });

    dispatch(fetchRecord());
  };

  const handleSearchMode = num => {
    setSearchMode(num);
  }

  //검색창
  const handleSearchInput = text => {
    setSearchStr(text);

    let searchResult = null;

    switch(searchMode) {
      case 0: //운동 이름
        searchResult = recordReducer.payload.filter(
          item => item.exerciseName.toLowerCase().indexOf(text.toLowerCase()) !== -1
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