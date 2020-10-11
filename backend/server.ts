import dotenv from "dotenv";
import boxen from "boxen";
import chalk from "chalk";
const session = require("express-session");

import app from "./src/app";
import {Database} from "./src/models/base/Database";

// ----------------------------------
// Environment setup
// ----------------------------------
dotenv.config({path: ".env"});
const {
    API_URL = "http://localhost",
    API_PORT = 5500,
    SESS_NAME = "sid",
    SESS_SECRET = "top-secret",
    SESS_LIFETIME = 1000 * 60 * 60 * 2, // 2 hrs
    DB_NAME = "rdigital",
    DB_USER = "",
    DB_PASS = ""
} = process.env;

app.use(
    session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: "none",
            secure: false,
        }
    }));

// ----------------------------------
// Connect to DB
// ----------------------------------
const db = new Database(DB_NAME, DB_USER, DB_PASS);
db.connect();
console.log("DB DB_NAME, DB_USER, DB_PASS", DB_NAME, DB_USER, DB_PASS);


// ----------------------------------
// Express server
// ----------------------------------
const server = app.listen(API_PORT, () => {
    const ENV_MODE = process.env.NODE_ENV ? process.env.NODE_ENV : "prod";
    let message = `\n${chalk.bold(`SERVER is running on ${API_URL}:${API_PORT} in ${ENV_MODE} mode `)}`;
        message += `\n${chalk.green('To change these config(server and port), edit .env file')}`;
        message += `\n\n${chalk.red('Press CTRL-C to stop')}`;
        console.log(boxen(message, {
            padding: 1,
            borderColor: 'green',
            margin: 1
        }));
}
);

export default server;
