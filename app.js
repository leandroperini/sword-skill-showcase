const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const routes = require("./routes/loader");
const db = require("./db/setup");

const app = express();

app.use(logger(process.env.STAGE === "development" ? "dev" : "default"));
app.use(express.json());

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  db.connectionManager.close();
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  db.connectionManager.close();
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.STAGE === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (process.env.STAGE === "development") console.error(err);
  res.json(err);
});

module.exports = app;
