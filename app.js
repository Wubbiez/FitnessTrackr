require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const apiRouter = require("./api");

// connect to DB
const client = require("./db/client");
client.connect();

// Setup your Middleware and API Router here
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// 404 handler
app.use("/api", apiRouter);

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found!" });
});

module.exports = app;
