const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const tokenHelper = require("../token-helper");
const { tokenVerifierMiddleware } = tokenHelper;
const cors = require("cors");
const {
  registerPlayer,
  authenticatePlayer,
  retrievePlayers,
  retrieveScore,
  setScorePlayer,
  retrieveMatchesScrapping,
  setIdMatches,
  retrieveAvailabilityPlayers,
  availabilityPlayer
} = require("./handlers");

const jsonBodyParser = bodyParser.json();

const router = express.Router();
router.use(cors());

router.post("/register", jsonBodyParser, registerPlayer);
router.post("/authenticate", jsonBodyParser, authenticatePlayer);
router.get(
  "/retrievePlayers",
  [jsonBodyParser, tokenVerifierMiddleware],
  retrievePlayers
);
router.get(
  "/retrieveScore",
  [jsonBodyParser, tokenVerifierMiddleware],
  retrieveScore
);
router.put(
  "/setScorePlayer",
  [jsonBodyParser, tokenVerifierMiddleware],
  setScorePlayer
);
router.get(
  "/retrieveMatches",
  [jsonBodyParser, tokenVerifierMiddleware],
  retrieveMatchesScrapping
);
router.put(
  "/setIdMatches",
  [jsonBodyParser, tokenVerifierMiddleware],
  setIdMatches
);
router.get(
  "/retrieveAvailabilityPlayers/:matchId",
  retrieveAvailabilityPlayers
);
router.put(
  "/availabilityPlayer",
  jsonBodyParser,
  availabilityPlayer
);

module.exports = router;
