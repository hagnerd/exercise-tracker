const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

/* Connect to MongoDB on MLAB */
mongoose.connect(
  process.env.MLAB_URI,
  { useNewUrlParser: true },
  err => {
    if (err) {
      throw new Error("Failed to connect to database");
    } else {
      console.log(`Successfully connected to MLAB!`);
    }
  }
);

/* Middleware */
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

/* Index Route */
app.get("/", (_, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

/* 404 - Route not found */
app.use((req, res, next) => {
  return next({ status: 404, message: "Page not found" });
});

app.use((err, _, res) => {
  let errorCode, errorMessage;

  if (err.errors) {
    // Mongoose validation error
    errorCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errorMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errorCode = err.status || 500;
    errorMessage = err.message || "Internal Service Error";
  }

  res
    .status(errorCode)
    .type("txt")
    .send(errorMessage);
});

module.exports = app;
