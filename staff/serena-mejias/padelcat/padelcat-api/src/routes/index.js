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
  getPlayerById,
  retrieveScore,
  setScorePlayer,
  retrieveMatchesScrapping,
  getMatchesWithData,
  retrieveAvailabilityPlayers,
  availabilityPlayer,
  deleteAvailabilityPlayer,
  addChosenPlayers
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
  "/getPlayerById",
  [jsonBodyParser, tokenVerifierMiddleware],
  getPlayerById
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
router.get(
  "/getMatchesWithData",
  [jsonBodyParser, tokenVerifierMiddleware],
  getMatchesWithData
);
router.get(
  "/retrieveAvailabilityPlayers/:matchId",
  retrieveAvailabilityPlayers
);
router.put("/availabilityPlayer", [jsonBodyParser, tokenVerifierMiddleware], availabilityPlayer);
router.put(
  "/deleteAvailabilityPlayer",
  [jsonBodyParser, tokenVerifierMiddleware],
  deleteAvailabilityPlayer
);
router.put("/chosenPlayers", [jsonBodyParser, tokenVerifierMiddleware], addChosenPlayers);


module.exports = router;
