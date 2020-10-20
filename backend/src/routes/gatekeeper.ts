import express from "express";
import { updateGatekeeper } from "../controllers/gatekeeper";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router.route("/:id").put(ws_update, updateGatekeeper);

export default router;
