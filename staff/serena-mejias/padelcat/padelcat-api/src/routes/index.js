const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const tokenHelper = require("../token-helper");
const { tokenVerifierMiddleware } = tokenHelper;
const package = require("../../package.json");
const cors = require("cors");
const app = express();
const { registerPlayer, authenticatePlayer, retrieveScoreData, addScoreToPlayer } = require("./handlers");

app.use(cors());

const jsonBodyParser = bodyParser.json();

const router = express.Router();

router.post("/register", jsonBodyParser, registerPlayer);
router.post("/authenticate", jsonBodyParser, authenticatePlayer);
router.get("/retrieveScore", retrieveScoreData);
router.put("/addScore", [jsonBodyParser, tokenVerifierMiddleware], addScoreToPlayer);

module.exports = router;