const { Schema } = require("mongoose");

const Match = new Schema({
  matchId: {
    type: String
  },

  playersAvailable: {
    type: Array
  },

  playersChosen: { firstPair: [], secondPair: [], thirdPair: [] },

  result: {
    type: String
  },

});

module.exports = Match;
