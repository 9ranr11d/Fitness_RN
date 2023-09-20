import { FETCH_RECORD, FETCH_RECORD_ERROR, DELETE_RECORD } from "../types";

const initState = {
  payload: [],
  msg: "",
};

const recordReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_RECORD:
      console.log("In RecordReducer")
      return {
        ...state,
        payload: action.payload,
        msg: "",
      };
    case FETCH_RECORD_ERROR: 
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};

export default recordReducer;