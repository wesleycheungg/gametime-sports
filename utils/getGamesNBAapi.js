var axios = require('axios');
const rapidAPI_key = require('../config/keys').rapidAPI_key;
const rapidAPI_host = require('../config/keys').rapidApi_host;

// model
const Game = require('../models/Game');

// need to get tomorrows date because api gets todays actual games with tomorrows date as param
const getTomorrowsDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // get tomorrows date

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const getGameResultsFromNBAapi = () => {
  const dateForTodaysGames = getTomorrowsDate()
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {date: dateForTodaysGames},
    headers: {
      'X-RapidAPI-Key': rapidAPI_key,
      'X-RapidAPI-Host': rapidAPI_host
    }
  };

  axios(options)
  .then(function (response) {
    let data = response.data.response

    for(let i = 0; i < data.length; i++) {
      let gameObj = {};

      let result = data[i].status;
      let season = data[i].season;
      let gameId = data[i].id;
      let startTime = data[i].date.start;
      let homeTeam = data[i].teams.home;
      let awayTeam = data[i].teams.visitors;
      let homeScore = data[i].scores.home;
      let awayScore = data[i].scores.visitors;
      let quarter = data[i].periods;
      let arena = data[i].arena;

      gameObj.game_id = gameId;
      gameObj.status = result;
      gameObj.season = season;
      gameObj.start_time = startTime;
      gameObj.home_team = homeTeam;
      gameObj.away_team = awayTeam;
      gameObj.home_score = homeScore;
      gameObj.away_score = awayScore;
      gameObj.arena = arena;
      gameObj.quarter = quarter;

      console.log(gameObj)

      console.log('GAMEOBJECT ' + gameObj)

      Game.findOne({game_id: `${gameId}`})
      .then(game => {
        if(game === null) {
          let newGame = new Game(gameObj);
          console.log(newGame);
          newGame.save();
        } else if (!!game) {
          game.status = result;
          game.home_score = homeScore;
          game.away_score = awayScore;
          game.quarter = quarter;
          
          game.save()
        }
      })
      .catch(err => console.log(err))
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = getGameResultsFromNBAapi;