const cron = require('node-cron');
const mongoose = require("mongoose");
const db = require('../config/keys').mongoURI;
const getGameResultsFromNBAapi = require('../utils/getGamesNBAapi');
const getGameOdds = require('../utils/getGameOdds');


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Running APIs'))
    .catch(err => console.log(err));


const tasks = () => {
    const currentTime = new Date();

    cron.schedule('*/10 * * * *', () => {
      getGameResultsFromNBAapi();
      console.log('JUST RAN NBA API ' + currentTime)
    });

    cron.schedule('0 6-12 * * *', () => {
      getGameOdds(); 
      console.log('JUST ODDS API ' + currentTime)
    });
}

module.exports = tasks;