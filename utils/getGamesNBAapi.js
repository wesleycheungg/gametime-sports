var axios = require('axios');
const rapidAPI_key = require('../config/keys').rapidAPI_key;
const rapidAPI_host = require('../config/keys').rapidApi_host;

// need to get tomorrows date because api gets todays actual games with tomorrows date as param
const getTomorrowsDate = () => {
  const today = new Date();
  // console.log(today)
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
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = getGameResultsFromNBAapi;