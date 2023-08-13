import Realm from "realm";

class WorkoutRecord extends Realm.Object {}

WorkoutRecord.schema = {
  name: "WorkoutRecord",
  properties: {
    id: { type: "objectId", indexed: true },
    date: "string",
    muscleGroups: { type: "list", objectType: "string" },
    exerciseName: "string",
    numOfSets: "int",
    weights: { type: "list", objectType: "string" },
    repsPerSet: { type: "list", objectType: "string" },
    restTimesBtwSets: { type: "list", objectType: "string" },
  },
  primaryKey: "id",
};

export default new Realm({ schema: [WorkoutRecord] });