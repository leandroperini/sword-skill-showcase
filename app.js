const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const routes = require("./routes/loader");
const db = require("./db/setup");
const app = express();
const { authenticate } = require("./middlewares/RequireAuth");
const nonProductionStages = ["development", "test"];

const hash = require("pbkdf2-password")();
app.use(
  logger(nonProductionStages.includes(process.env.STAGE) ? "dev" : "default")
);

app.use(express.json());

app.use(authenticate);
app.use("/", routes);

app.use(function (req, res, next) {
  db.connectionManager.close();
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  db.connectionManager.close();
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = nonProductionStages.includes(process.env.STAGE) ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (nonProductionStages.includes(process.env.STAGE)) console.error(err);
  res.json(err);
});

module.exports = app;
