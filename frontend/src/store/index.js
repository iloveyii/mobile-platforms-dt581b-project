import Login from "../models/Login";
import User from "../models/User";
import Door from "../models/Door";
import Permission from "../models/Permission";
import Gatekeeper from "../models/Gatekeeper";

const models = {
  logins: new Login("logins"),
  users: new User("users"),
  doors: new Door("doors"),
  permissions: new Permission("permissions"),
  gatekeepers: new Gatekeeper("gatekeepers"),
};

export default models;
