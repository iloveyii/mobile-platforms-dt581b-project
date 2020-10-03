// ----------------------------------
// Package Import
// ----------------------------------
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import helmet from "helmet";
import * as path from "path";

const fileUpload = require("express-fileupload");

// ----------------------------------
// Middleware Import
// ----------------------------------
import { errorHandler } from "./middlewares/error_handler";
import { notFound } from "./middlewares/not_found";

// ----------------------------------
// Routes Import
// ----------------------------------
import login from "./routes/login";
import user from "./routes/user";
// RDigital
import fault from "./routes/fault";

// ----------------------------------
// Express configuration
// ----------------------------------
const app: any = express();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(compression());
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors({origin: "*", optionsSuccessStatus: 200}));
app.use(fileUpload({
    createParentPath: true,
    limits: {fileSize: 50 * 1024 * 1024},
}));

// ----------------------------------
// Security - header
// ----------------------------------
app.use(helmet());

// ----------------------------------
// Logging
// ----------------------------------
app.use(morgan("common"));

// ----------------------------------
// EJS Layouts
// ----------------------------------
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/users", user);
app.use("/api/v1/logins", login);
app.use("/api/v1/faults", fault);

// ----------------------------------
// Not found - 404
// ----------------------------------
app.use(notFound);

// ----------------------------------
// Error handling
// ----------------------------------
app.use(errorHandler);

// ----------------------------------
// Export app
// ----------------------------------
export default app;
