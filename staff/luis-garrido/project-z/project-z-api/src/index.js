'use strict'

require("dotenv").config();
require("isomorphic-fetch");

const express = require("express");
const packageDotJson = require("../package.json");
const router = require("./routes");

const { mongoose } = require('project-z-data');
const tokenHelper = require("./token-helper");

const {
    env: { DB_URL, PORT, JWT_SECRET },
    argv: [, , port = PORT || 8080]
} = process;

mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET;

        const app = express();

        app.use("/api", router);

        app.listen(port, () =>
            console.log(
                `${packageDotJson.name} ${packageDotJson.version} running on port ${port}. Welcome!`
            )
        );
    })
    .catch(console.error);

process.on("SIGINT", () => {
    mongoose.disconnect().then(() => {
        console.log(`\n ${packageDotJson.name} stopped. Bye!`);

        process.exit(0);
    });
});
