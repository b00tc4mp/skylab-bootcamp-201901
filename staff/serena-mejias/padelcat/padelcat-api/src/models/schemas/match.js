const { Schema } = require("mongoose");

const Match = new Schema({
  team1: {
    type: String
  },
  
  team1Image: {
    type: String
  },

  team2: {
    type: String
  },

  team2Image: {
    type: String
  },

  playersAvailable: {
    type: Array
  },

  playersChosen: { firstPair: [], secondPair: [], thirdPair: [] },

  date: {
    type: Date
  },

  result: {
    type: String
  }
});

module.exports = Match;
