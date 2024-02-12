const axios = require('axios');
const rapidAPI_key = require('../config/keys').rapidAPI_key;

// model
const Game = require('../models/Game');

//the 9 hour diff between Cali and GMT in milliseconds 
//1000 * 60 * 60 * 8

let offset = 28800000; 

const getGameOdds = () => {

  const options = {
      method: 'GET',
      url: 'https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds',
      params: {
        regions: 'us',
        oddsFormat: 'american',
        markets: 'h2h,spreads',
        dateFormat: 'iso'
      },
      headers: {
        'X-RapidAPI-Key': rapidAPI_key,
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    };
  
  axios(options)
  .then( res => {
    let odds = res.data; 

    for (let i = 0; i < res.data.length; i++){
      let odds_obj = {}; 

      odds_obj.start_time = odds[i].commence_time;
      odds_obj.home_team = odds[i].home_team;
      odds_obj.away_team = odds[i].away_team;
      odds_obj.odds = odds[i].bookmakers[0]; // bookmakers[0] = DraftKings

      Game.findOne({$and: [{home_name: `${odds_obj.home_team}`},{away_name: `${odds_obj.away_team}`}]})
      .then(game => {
          console.log(game + 'BEFORE IF STATEMENT')
          if (game !== null) {
            game.odds = odds_obj.odds
            game.save()
          }
      })
    }
  })
}


module.exports = getGameOdds;