import { FETCH_RECORD } from "../types";

const initState = {
  id: "",
  date: "",
  muscleGroups: [],
  exerciseName: "",
  numOfSets: 0,
  weights: [],
  repsPerSet: [],
  restTimesBtwSets: [],
};

const recordReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_RECORD:
      return {
        ...state,
        id: action.id,
        date: action.date,
        muscleGroups: action.muscleGroups,
        exerciseName: action.exerciseName,
        numOfSets: action.numOfSets,
        weights: action.weights,
        repsPerSet: action.repsPerSet,
        restTimesBtwSets: action.restTimesBtwSets,
      };
    default:
      return state;
  }
};

export default recordReducer;