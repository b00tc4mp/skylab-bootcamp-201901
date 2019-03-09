const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const tokenHelper = require("../token-helper");
const { tokenVerifierMiddleware } = tokenHelper;
const cors = require("cors");
const { registerPlayer, authenticatePlayer, retrieveScoreData, addScoreToPlayer, retrieveMatchesScrapping, setIdMatches, retrieveAvailabilityPlayers } = require("./handlers");



const jsonBodyParser = bodyParser.json();

const router = express.Router();
router.use(cors());

router.post("/register", jsonBodyParser, registerPlayer);
router.post("/authenticate", jsonBodyParser, authenticatePlayer);
router.get("/retrieveScore", retrieveScoreData);
router.put("/addScore", [jsonBodyParser, tokenVerifierMiddleware], addScoreToPlayer);
router.get("/retrieveMatches", [jsonBodyParser, tokenVerifierMiddleware], retrieveMatchesScrapping);
router.put("/setIdMatches", [jsonBodyParser, tokenVerifierMiddleware], setIdMatches);
debugger
router.get("/retrieveAvailabilityPlayers", jsonBodyParser, retrieveAvailabilityPlayers);

module.exports = router;