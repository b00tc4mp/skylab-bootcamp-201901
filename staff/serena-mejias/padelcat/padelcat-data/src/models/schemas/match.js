const { Schema } = require("mongoose");

const Match = new Schema({
  matchId: {
    type: String
  },

  playersAvailable: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }
  ],

  playersChosen: {
    type: Object,
    properties: {
      "firstPair-firstPlayer": { type: Schema.Types.ObjectId, ref: "Player" },
      "firstPair-secondPlayer": { type: Schema.Types.ObjectId, ref: "Player" },
      "secondPair-firstPlayer:": { type: Schema.Types.ObjectId, ref: "Player" },
      "secondPair-secondPlayer": { type: Schema.Types.ObjectId, ref: "Player" },
      "thirdPair-firstPlayer": { type: Schema.Types.ObjectId, ref: "Player" },
      "thirdPair-secondPlayer": { type: Schema.Types.ObjectId, ref: "Player" }
    }
  },

  result: {
    type: String
  }
});

module.exports = Match;
