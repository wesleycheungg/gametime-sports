// libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// database URI
const db = require("./config/keys").mongoURI;

// routes/api
const users = require("./routes/api/users");
const games = require("./routes/api/games");

// models
const User = require("./models/User");

// NBA games API
const tasks = require("./bin/cron-scheduler");
const getGameResultsFromNBAapi = require("./utils/getGamesNBAapi");


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json()); 

app.use("/api/users", users)
app.use("/api/games", games)

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`listening on port ${port}`)});

// getGameResultsFromNBAapi();
// tasks();