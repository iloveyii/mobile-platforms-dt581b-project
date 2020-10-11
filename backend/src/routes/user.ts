import express from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getUser)
    .delete(deleteUser) // should admin delete
    .put(updateUser);

router.route("/")
    .get(getUsers)
    .post(createUser);


export default router;