require("dotenv").config();

require("isomorphic-fetch");

const  {mongoose}  = require("TimeTo-data");
const express = require("express");
const tokenHelper = require('./token-helper')
const package = require('../package.json')
const router = require('./routes')

const {
  env: {
    MONGO_URL,
    PORT,
    JWT_SECRET,
  },
  argv: [, , port = PORT || 8080]
} = process;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    tokenHelper.jwtSecret = JWT_SECRET

    const app = express()

    app.use("/final-proyect/api", router);

    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);

  process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log(`\n ${package.name} stopped`)

            process.exit(0)
        })
})
