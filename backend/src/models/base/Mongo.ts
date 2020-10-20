import { ObjectId } from "mongodb";
import { ResponseT, UserT } from "../../types";
import { ConditionI, ModelI } from "../../interfaces";
import { Database } from "./Database";
import { Validator } from "node-input-validator";

// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Mongo implements ModelI {
  // for response
  _response: ResponseT = {
    success: true,
    data: [],
  };
  public database: any;

  constructor(private readonly collection: string, public data: any) {
    // console.log("Mongo Collection : ", collection, data);
    this.database = Database.database;
  }

  // ----------------------------------
  // Implement interface
  // ----------------------------------
  async create(): Promise<any> {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    this.data._id = new ObjectId(this.data.id);
    const model = await collection.insertOne(this.data);
    console.log("Created : ", model.ops[0]);
    this.setResponse(true, model.ops[0]);
    return this;
  }

  async read(condition?: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    const model = await collection.find(condition?.where);
    const arr = await model.toArray();
    if (arr.length > 0) {
      this.setResponse(true, arr);
    } else {
      this.setResponse(false, [
        "No record found with condition " + JSON.stringify(condition?.where),
      ]);
    }
    return this;
  }

  async update(condition: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    delete this.data["_id"];
    const model = await collection.findOneAndUpdate(
      condition?.where,
      { $set: { ...this.data } },
      {
        upsert: true,
        returnOriginal: false,
      }
    );
    this.setResponse(true, model.value);
    return this;
  }

  async delete(condition: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    const model = await collection.deleteOne(condition?.where);
    if (model.deletedCount > 0) {
      this.setResponse(true, {
        id: JSON.parse(JSON.stringify(condition.where))["_id"],
        message:
          "Deleted record with condition " + JSON.stringify(condition.where),
      });
    } else {
      this.setResponse(
        false,
        "Cannot delete record with condition " + JSON.stringify(condition.where)
      );
    }
    return this;
  }

  async deleteMany(condition: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    const model = await collection.deleteMany(condition?.where);
    console.log("Deleted : ", model.deletedCount);
  }

  // ----------------------------------
  // Class methods
  // ----------------------------------
  setResponse(success: boolean, data: any) {
    // add id from _id
    let newData = [];
    if (!Array.isArray(data)) data = [data];
    newData = data.map((d: any) => {
      if (d._id) {
        d["id"] = d._id;
      }
      return d;
    });
    this._response = { success: success, data: newData };
  }

  get response(): ResponseT {
    return this._response;
  }

  rules() {
    return {};
  }

  async validate() {
    const rules = this.rules();
    const validator = new Validator(this.data, rules);
    const matched = await validator.check();
    if (!matched) {
      this.setResponse(false, validator.errors);
      return false;
    }
    this.setResponse(true, validator.errors);
    return true;
  }
}

export default Mongo;
