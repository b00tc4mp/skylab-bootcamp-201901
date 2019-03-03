const { Schema } = require("mongoose");

const Match = new Schema({
  team1: {
    type: String
  },

  team2: {
    type: String
  },

  playersAvailable: {
    type: Array
  },

  playersChosen: {
    type: Array
  },

  date: {
    type: Date
  },

  result: {
    type: String
  }
});

module.exports = Match;
