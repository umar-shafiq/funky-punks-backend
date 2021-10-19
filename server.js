// Dotenv handy for local config & debugging
require("dotenv").config();

// Core Express & logging stuff
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("./src/middleware/error-handler");
const { sequelize } = require("./models");

const app = express();

const path = require("path");

// Logging
app.use(logger("dev"));

//cors
const cors = require("cors");
const helmet = require("helmet");
const cors = require("cors");

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.all("/api/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//   next();
// });

//wearing a helmet

// app.use(helmet());

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// Parsing middleware
app.use(bodyParser.json());

app.use("/output", express.static("output"));
app.use("/images", express.static("images"));

// app.use(express.static(path.join(__dirname, "../data")));
// //taimor edits
// app.use(express.static(path.join(__dirname, "/images")));

// //output public
// app.use(express.static(path.join(__dirname, "output")));

//

// Routes & controllers
app.get("/", (req, res) => res.json({ msg: "Welcome to Punks Api" }));
app.use("/api", require("./src/routes/generate-art"));

// app.use("/admin", require("./src/routes/admin"));

// Catch all route, generate an error & forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

// Get values from env vars or defaults where not provided
let port = process.env.PORT || 3000;

// Start the server
app.listen(port || 4000, async () => {
  console.log(`Server Started on port ${port}`);
  console.log("DB connected");
});

module.exports = app;
