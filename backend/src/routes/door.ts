import express from "express";
import { getDoor, getDoors, createDoor, updateDoor, deleteDoor } from "../controllers/door";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getDoor)
    .delete(deleteDoor) // should admin delete
    .put(updateDoor);

router.route("/")
    .get(getDoors)
    .post(createDoor);


export default router;
