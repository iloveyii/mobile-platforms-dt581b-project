import Login from "../models/Login";
import User from "../models/User";
import Door from "../models/Door";
import Permission from "../models/Permission";



const models = {
    logins: new Login('logins'),
    users: new User('users'),
    doors: new Door('doors'),
    permissions: new Permission('permissions'),
};

export default models;
