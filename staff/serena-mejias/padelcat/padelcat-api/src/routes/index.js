const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const tokenHelper = require("../token-helper");
const { tokenVerifierMiddleware } = tokenHelper;
const cors = require("cors");
const { registerPlayer, authenticatePlayer, retrieveScoreData, addScoreToPlayer, retrieveMatches } = require("./handlers");



const jsonBodyParser = bodyParser.json();

const router = express.Router();
router.use(cors());

router.post("/register", jsonBodyParser, registerPlayer);
router.post("/authenticate", jsonBodyParser, authenticatePlayer);
router.get("/retrieveScore", retrieveScoreData);
router.put("/addScore", [jsonBodyParser, tokenVerifierMiddleware], addScoreToPlayer);
router.put("/retrieveMatches", [jsonBodyParser, tokenVerifierMiddleware], retrieveMatches);

module.exports = router;