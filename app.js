// libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// database URI
const db = require("./config/keys").mongoURI;

// routes/api
const users = require("./routes/api/users");
const games = require("./routes/api/games");

// models
const User = require("./models/User");

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const user = new User({
        handle: "test",
        email: "testing@gmail.com",
        password: "password"
    })
    user.save()
    res.send("Hello Everyone!!");
});

app.use("/api/users", users)
app.use("/api/games", games)


const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`listening on port ${port}`)});

