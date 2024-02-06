const express = require("express");
const router = express.Router();
const Game = require('../../models/Game');

//index, show

const isToday = (someDate) => {
  const today = new Date();
  someDate = new Date(someDate);
  return (someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear());
}

const getYesterdaysDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


router.get('/index', (req, res) => {
  Game.find().then(games => {
    const todaysGames = games.filter(game => true);
    return res.json(todaysGames)
  })
})

router.get('/:gameId', (req, res) => {
  Game.findById(req.params.gameId, (err, game) => {
    if (!!game){
      return res.json(game);
    } else {
      return res.status(404).json({"msg": "Game not found"});
    }
  })
})

module.exports = router;