const express = require("express");
const router = express.Router();
const User = require('../../models/User')
const Game = require('../../models/Game');
const e = require("express");
const Bet = require("../../models/Bet");
const mongoose = require("mongoose");

//index, delete, create

//Incomplete, started, won, lost

router.get('/index/:userId', (req, res) => { 
  let userId = req.params.userId
  Bet.find({user: userId}, (err, bets) => {
    return res.json(bets)
  })
})

router.get('/games/index/:gameId', (req, res) => {
  let gameId = req.params.gameId
  Bet.find({game: gameId}, (err, bets) => {
    return res.json(bets)
  })
})

router.delete('/:betId', (req, res) => {
  Bet.findByIdAndDelete(req.params.betId, (err, bet) => {
    if(bet === null){
      return res.status(404).json({"msg": "bet already deleted"})
    }
    if (!!err){
      return res.status(422).json({"msg": "Failed to delete bet"})
    } else {
      User.findById(bet.user, (err, user) => {
        if (!!err){
          return res.status(404).json({"msg": "Bet is pointing to a nonexistent user, Bet deleted"})
        }
        Game.findById(bet.game, (err, game) => {
          if(!!game){
            if(game.status === "Incomplete"){
              if (bet.status === "Incomplete"){

                user.currency += bet.amount

                //Updating ledger 
                // user.history.push({x: new Date(Date.now()), y: user.currency})

                user.save()
                return res.json({user, bet})
              } else {
                return res.json({"msg": "Bet was already resolved. Bet deleted"})
              }
            } else {
              bet.save()
              return res.status(422).json({"msg": "Game is in progress or concluded. Bet not deleted."})
            }
          } else {
            return res.status(404).json({"msg": "Bet is refrencing a non-existent game. Bet deleted."})
          }
        })
      })
    }
  })
})


const util = require('util');

router.post('/create', (req, res) => {
    if (typeof req.body.userId === 'undefined' ){
        return res.status(404).json({"msg":"userId is undefined"})
    }

    // console.log(util.inspect(req.body, { depth: null }) + ' REQUEST')
    let userId = req.body.userId;
    let gameId = req.body.game;
    let betAmount = req.body.amount

    User.findById(userId)
        .then((user) => {
            if (user) {
                if (req.body.amount <= 1) {
                    return res.status(422).json({"msg": "User must bet at least 1 unit of currency"})
                }
                if (user.currency - req.body.amount >= 0){
                    let bet = {}
                    bet.user = user;

                    Game.findById(gameId)
                        .then((game) => {
                            if(game.status.long === 'Finished' || game.status === "In Play") {
                                return res.status(422).json({"msg": `game ${game.status}`})
                            }

                            bet.game = gameId;
                            bet.status = 'Incomplete';
                            bet.amount = parseInt(betAmount);

                            //set bet.date equal to today 
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();

                            bet.date = yyyy + '-' + mm + '-' + dd;

                            // set bet status 
                            if (req.body.selection === "true"){
                                selection = true;
                            } else {
                                selection = false; 
                            }

                            console.log(game + 'BET SLIP')

                            let home_spread_odds = game.odds === undefined ? null : game.odds.markets[1].outcomes[1].price;
                            let away_spread_odds = game.odds === undefined ? null : game.odds.markets[1].outcomes[0].price;
                            //caculate payout
                            if (selection){
                                bet.selection = game.home_team.name
                                if (home_spread_odds > 0){
                                    bet.payout = (home_spread_odds/100) * bet.amount + bet.amount
                                } else {
                                    bet.payout = (100/home_spread_odds) * bet.amount * -1 + bet.amount
                                }
                                } else {
                                    bet.selection = game.away_team.name
                                if (away_spread_odds > 0){
                                    bet.payout = (away_spread_odds/100) * bet.amount + bet.amount
                                } else {
                                    bet.payout = (100/away_spread_odds) * bet.amount * -1 + bet.amount
                                }
                            }

                            bet.payout = Math.floor(bet.payout);

                            // deduct amount
                            user.currency -= bet.amount;

                            user.save();

                            let newBet = new Bet(bet);
                            newBet.save();
                            return res.json({bet: newBet, user: user,  "msg": "Bet was succesfully saved!"})

                        })
                } else {
                    //If it's not, respond with an error + message
                    return res.status(422).json({"msg": "Not enough funds." })
                }
            }
        }).catch((error) => { console.error(error); })
})

module.exports = router; 