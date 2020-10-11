import express from "express";
import { getPermission, getPermissions, createPermission, updatePermission, deletePermission } from "../controllers/permission";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getPermission)
    .delete(deletePermission) // should admin delete
    .put(updatePermission);

router.route("/")
    .get(getPermissions)
    .post(createPermission);


export default router;
