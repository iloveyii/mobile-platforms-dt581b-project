import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type DoorT = {
    _id?: string;
    building: string;
    room_number: string;
};

const COLLECTION = "doors";

class Door extends Mongo {

    constructor(private door?: DoorT) {
        super(COLLECTION, door);
    }

    rules() {
        return {
            building: "required"
        };
    }
}

export default Door;
