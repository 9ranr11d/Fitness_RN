import { FETCH_RECORD, FETCH_RECORD_ERROR } from "../types";

const initState = {
  payload: [],
  msg: "",
};

const recordReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_RECORD:
      return {
        ...state,
        payload: action.payload,
        msg: "",
      };
    case FETCH_RECORD_ERROR: {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default:
      return state;
  }
};

export default recordReducer;