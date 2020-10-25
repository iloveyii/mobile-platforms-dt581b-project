import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import Condition from "../models/base/Condition";
import SensorData from "../models/SensorData";
import sensor_data, {
  roundTimestamp,
  createRandomSensorData,
} from "../console/sensor_data";
import { totalmem } from "os";

// @desc   Get all from Model
// @route  GET /api/v1/sensor_datas
export const getSensorDatas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const model = new SensorData(undefined);
  await model.read();
  return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/sensor_data/:id
export const getSensorData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Here user want to get sensor data for current timestamp, and not a specific row with id
  const data = createRandomSensorData();
  const timestamp = roundTimestamp(1000 * 60); // 1 min
  const condition = new Condition({
    where: { user_id: req.params.id, timestamp },
  });
  const model = new SensorData({ user_id: req.params.id, data, timestamp });
  await model.createIfNotExist(condition);
  return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/sensor_data/:id/:range
export const getSensorDataRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Here user want to get sensor data for current timestamp, and not a specific row with id
  const [startTimeStamp, endTimeStamp] = req.params.range.split("-");
  console.log(startTimeStamp, endTimeStamp, req.params);
  const data = createRandomSensorData();
  const timestamp = roundTimestamp(1000 * 60); // 1 min
  const condition = new Condition({
    where: {
      user_id: new ObjectId(req.params.id),
      timestamp: {
        $gte: parseInt(startTimeStamp),
        $lte: parseInt(endTimeStamp),
      },
    },
  });
  const model = new SensorData({ user_id: req.params.id, data, timestamp });
  await model.read(condition);
  // Average data
  const average = {
    temperature: 0,
    co2: 0,
    humidity: 0,
    pressure: 0,
  };
  if (model.response.success) {
    model.response.data.forEach((sensor_data: any) => {
      const { data } = sensor_data;
      average["temperature"] += data.temperature.value;
      average["co2"] += data.co2.value;
      average["humidity"] += data.humidity.value;
      average["pressure"] += data.pressure.value;
    });
    average.temperature = average.temperature / model.response.data.length;
    average.co2 = average.co2 / model.response.data.length;
    average.humidity = average.humidity / model.response.data.length;
    average.pressure = average.pressure / model.response.data.length;
  }
  return res.status(200).send(average);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/sensor_data
export const createSensorData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("SensorData received :", req.body.sensordata);
  const model = new SensorData(req.body);
  (await model.validate()) && (await model.create());
  return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/sensor_data
export const updateSensorData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new SensorData(req.body);
  (await model.validate()) && (await model.update(condition));
  return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/sensor_data
export const deleteSensorData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deleting record from sensordata with id ", req.params.id);
  const model = new SensorData(req.body);
  const condition = new Condition({ where: { id: req.params.id } });
  await model.delete(condition);
  return res.status(200).send(model.response);
};
