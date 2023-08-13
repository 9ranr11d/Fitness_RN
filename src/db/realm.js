import Realm from "realm";

class WorkoutRecord extends Realm.Object {}

WorkoutRecord.schema = {
  name: "WorkoutRecord",
  properties: {
    id: { type: "int", indexed: true },
    date: "string",
    muscleGroup: { type: "list", objectType: "string" },
    exerciseName: "string",
    numOfSets: { type: "list", objectType: "string" },
    weight: { type: "list", objectType: "string" },
    repPerSet: { type: "list", objectType: "string" },
    restTimeBtwSets: { type: "list", objectType: "string" },
  },
  primaryKey: "id",
};

export default new Realm({ schema: [WorkoutRecord] });