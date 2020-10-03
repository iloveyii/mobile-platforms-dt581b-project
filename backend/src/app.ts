import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import * as path from "path";

// ----------------------------------
// Routes Import
// ----------------------------------
import login from "./routes/login";
import user from "./routes/user";
// RDigital
import fault from "./routes/fault";

// ----------------------------------
// Connect to DB
// ----------------------------------
const dialect = "mongodb"; // process.env.DB_DIALECT || "mongodb";

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
// Export app
// ----------------------------------
export default app;
