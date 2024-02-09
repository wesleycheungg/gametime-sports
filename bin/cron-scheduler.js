const cron = require('node-cron');
const mongoose = require("mongoose")
const db = require('../config/keys').mongoURI
const getGameResultsFromNBAapi = require('../utils/getGamesNBAapi');


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.log(err));


const tasks = () => {
    const currentTime = new Date();

    cron.schedule('*/1 16-23 * * *', () => {
      getGameResultsFromNBAapi();
      console.log('JUST RAN NBA API ' + currentTime)
    });
}

module.exports = tasks;