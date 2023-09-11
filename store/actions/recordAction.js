import { FETCH_RECORD, FETCH_RECORD_ERROR } from "../types";
import realm from "../../src/db/realm";

export const fetchRecord = () => dispatch => {
  try {
    const recordList = realm.objects("WorkoutRecord");
    
    console.log("Record List :", recordList);

    dispatch({type: FETCH_RECORD, payload: recordList});
  }catch(error) {
    dispatch({type: FETCH_RECORD_ERROR, payload: error});
  }
};