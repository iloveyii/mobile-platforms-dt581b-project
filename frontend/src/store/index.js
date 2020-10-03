import Login from "../models/Login";
import User from "../models/User";



const store = {
    logins: new Login('logins'),
    users: new User('users'),
};

export default store;
