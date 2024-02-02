const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;


const GameSchema = new Schema({
  start_time: {
    type: Date,
    required: true 
  },
  home_team: {
    type: String,
    required: true 
  },
  away_team: {
    type: String,
    required: true
  },
  // home_odds: {
  //   type: Number, 
  //   required: true 
  // },
  // away_odds: {
  //   type: Number,
  //   required: true
  // },
  status: {
    type: String,
    required: true
  },
  game_start_time: {
    type: String,
    required: true
  },
  game_minute: {
    type: String
  },
  quarter: {
    type: String,
    required: true
  },
  home_score: {
    type: Number,
    required: true
  },
  away_score: {
    type: Number, 
    required: true 
  }
}) 

const Game = mongoose.model("games", GameSchema)

module.exports = Game; 