const { Schema } = require("mongoose");

const Match = new Schema({
  matchId: {
    type: String
  },

  playersAvailable: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],

  playersChosen: {
    type: Object,
    properties: {
      "firstPair-firstPlayer": { type: String },
      "firstPair-secondPlayer": { type: String },
      "secondPair-firstPlayer:": { type: String },
      "secondPair-secondPlayer": { type: String },
      "thirdPair-firstPlayer": { type: String },
      "thirdPair-secondPlayer": { type: String }
    }
  },

  result: {
    type: String
  }
});

module.exports = Match;
