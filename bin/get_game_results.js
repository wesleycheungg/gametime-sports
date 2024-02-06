const mongoose = require("mongoose");
const getGameResultsFromNBAapi = require('../utils/getGamesNBAapi');
const db = require('../config/keys').mongoURI

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(getGameResultsFromNBAapi())
    .catch(err => console.log(err));
