const mongoose = require("mongoose");
const {
    User,
    Game,
    Developer,
    Genre,
    Platform,
    Publisher,
    Boxart,
    Review
} = require("./schemas");

module.exports = {
    User: mongoose.model("User", User),
    Game: mongoose.model("Game", Game),
    Developer: mongoose.model("Developer", Developer),
    Genre: mongoose.model("Genre", Genre),
    Platform: mongoose.model("Platform", Platform),
    Publisher: mongoose.model("Publisher", Publisher),
    Boxart: mongoose.model("Boxart", Boxart),
    Review: mongoose.model("Review", Review),
    GameSchema: Game
};

// BandSchema.virtual('members', {
//     ref: 'Person', // The model to use
//     localField: 'name', // Find people where `localField`
//     foreignField: 'band', // is equal to `foreignField`
//     // If `justOne` is true, 'members' will be a single doc as opposed to
//     // an array. `justOne` is false by default.
//     justOne: false,
//     options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
//   });