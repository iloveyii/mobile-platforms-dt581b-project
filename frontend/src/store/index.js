import Login from "../models/Login";
import User from "../models/User";
import Door from "../models/Door";



const models = {
    logins: new Login('logins'),
    users: new User('users'),
    doors: new Door('doors'),
};

export default models;
