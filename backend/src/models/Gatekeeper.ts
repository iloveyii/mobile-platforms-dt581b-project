import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import axios from "axios";

type PermissionT = {
  _id?: string;
  building: string;
  room_number: string;
  status: string;
  command: string;
};

const COLLECTION = "permissions";

class Gatekeeper extends Mongo {
  constructor(private permission?: PermissionT) {
    super(COLLECTION, permission);
  }

  rules() {
    return {
      building: "required",
      room_number: "required",
      status: "required",
      command: "required",
    };
  }

  makeApiRequestToDevice(model: any) {
    const url = `http://localhost:7700/api/v1/gatekeepers/${this.permission?.command}`;
    axios.get(url).then((res: any) => {
      console.log("Received command on hardware behalf ", model);
    });
  }

  async update(condition?: ConditionI) {
    await this.read(condition);

    if (this.response.success) {
      const model = this.response.data[0];
      // Opening gateway to open Gatekeeper with uri
      console.log("Gatekeeper opened door", model);
      this.makeApiRequestToDevice(model);
      this.setResponse(true, [{ command: "success" }]);
    } else {
      console.log("Gatekeeper cannot open door", this.response);

      this.setResponse(false, [{ command: "Cannot open door" }]);
    }

    return this;
  }
}

export default Gatekeeper;
