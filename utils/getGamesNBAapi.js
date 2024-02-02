var axios = require('axios');
const rapidAPI_key = require('../config/keys').rapidAPI_key;
const rapidAPI_host = require('../config/keys').rapidApi_host;

const getGameResultsFromNBAapi = () => {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {date: '2024-02-02'},
    headers: {
      'X-RapidAPI-Key': '78172c2bfbmsh62b4f443fbc5b3bp1febf0jsn70d994421a30',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
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