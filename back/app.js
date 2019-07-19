var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var lobbyRouter = require("./routes/lobby");
var gamesRouter = require("./routes/games");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/lobby", lobbyRouter);
app.use("/api/games", gamesRouter);

mongoose
  .connect("mongodb://mongo/express_api", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected piola"))
  .catch(err => console.log(err));

module.exports = app;
