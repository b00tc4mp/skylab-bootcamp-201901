const { Schema } = require("mongoose");

const Team = new Schema({
  name: {
    type: String
  },

  image: {
    type: String
  },
});

module.exports = Team;