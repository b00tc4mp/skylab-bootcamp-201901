require("dotenv").config();

require("isomorphic-fetch");

const mongoose = require("mongoose");
const express = require("express");
const tokenHelper = require("./token-helper");
const package = require("../package.json");
const router = require("./routes");

const {
  env: { DB_URL, PORT, JWT_SECRET },
  argv: [, , port = PORT || 8000]
} = process;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    tokenHelper.jwtSecret = JWT_SECRET;

    const app = express();

    app.use("/api", router);

    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("\nserver stopped");

  process.exit(0);
});
