const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var ObjectId = require('mongodb').ObjectID;

const GameSchema = new Schema({
  game_id: {
    type: Number
  },
  start_time: {
    type: Date
  },
  status: {
    type: Object
  },
  season: {
    type: Number
  },
  home_team: {
    type: Object
  },
  away_team: {
    type: Object,
  },
  home_score: {
    type: Object
  },
  away_score: {
    type: Object
  },
  quarter: {
    type: Object
  },
  arena: {
    type: Object
  }
  // home_odds: {
  //   type: Number, 
  //   required: true 
  // },
  // away_odds: {
  //   type: Number,
  //   required: true
  // },
}) 

const Game = mongoose.model("games", GameSchema)

module.exports = Game; 