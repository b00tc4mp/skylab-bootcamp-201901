require("dotenv").config();

require("isomorphic-fetch");

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logic = require("./logic");
const tokenHelper = require('./token-helper')
const package = require("../package.json");
const cors = require("cors");
const {
  registerPlayer,
  authenticatePlayer
  
} = require("./routes");

const {
  env: { DB_URL, PORT, JWT_SECRET },
  argv: [, , port = PORT || 8000]
} = process;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    logic.jwtSecret = JWT_SECRET;

    const app = express();
    
    app.use(cors());
    
    const jsonBodyParser = bodyParser.json();

    const router = express.Router();

    router.post("/register", jsonBodyParser, registerPlayer);
    router.post("/authenticate", jsonBodyParser, authenticatePlayer);

   

    app.use("/api", router);

    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("\nserver stopped");

  process.exit(0);
});