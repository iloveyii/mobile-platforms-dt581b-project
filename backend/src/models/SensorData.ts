import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type SensorDataT = {
  _id?: string;
  user_id: string;
  type: string;
  value: string;
  unit: string;
  timestamp?: string;
};

const COLLECTION = "sensor_data";

class SensorData extends Mongo {
  constructor(private SensorData?: SensorDataT) {
    super(COLLECTION, SensorData);
  }

  rules() {
    return {
      user_id: "required",
      type: "required",
      value: "required",
      unit: "required",
    };
  }
}

export default SensorData;
