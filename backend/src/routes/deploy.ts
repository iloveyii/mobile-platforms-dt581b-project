import express from "express";
import { createDeploy, getDeploys } from "../controllers/deploy";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router.route("/").get(getDeploys).post(createDeploy);

export default router;
