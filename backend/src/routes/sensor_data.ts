import express from "express";
import {
  getSensorData,
  getSensorDatas,
  createSensorData,
  updateSensorData,
  deleteSensorData,
} from "../controllers/sensor_data";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router
  .route("/:id")
  .get([authenticate_user, same_user_id], getSensorData)
  .delete(ws_update, deleteSensorData) // should admin delete
  .put(ws_update, updateSensorData);

router.route("/").get(getSensorDatas).post(ws_update, createSensorData);

export default router;
