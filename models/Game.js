const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var ObjectId = require('mongodb').ObjectID;

const GameSchema = new Schema({
  game_id: {
    type: Number
  },
  status: {
    type: Object
  },
  start_time: {
    type: Date
  },
  home_team: {
    type: Object
  },
  away_team: {
    type: Object,
    // required: true
  },
  home_score: {
    type: Object
  },
  away_score: {
    type: Object
  },
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