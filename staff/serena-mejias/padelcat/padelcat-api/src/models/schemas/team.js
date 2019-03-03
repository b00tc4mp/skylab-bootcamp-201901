const { Schema } = require("mongoose");

const Match = new Schema({
  name: {
    type: String
  },

  image: {
    type: String
  },
});

module.exports = Match;