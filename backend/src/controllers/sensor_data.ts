import { Request, Response, NextFunction } from "express";
import Condition from "../models/base/Condition";
import SensorData from "../models/SensorData";
import sensor_data, {
  roundTimestamp,
  createRandomSensorData,
} from "../console/sensor_data";

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
