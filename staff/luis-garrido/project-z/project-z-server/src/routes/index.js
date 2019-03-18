const express = require("express");
const cors = require("../cors");
const bodyParser = require("body-parser");
const tokenHelper = require("../token-helper");
const { tokenVerifierMiddleware } = tokenHelper;
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    searchGames,
    retrieveGameInfo,
    postReview,
    rankingGames,
    retrieveUserByUsername,
    retrieveRandomGame,
    retrievePredictedScore,
    retrieveEuclideanDistance,
    retrieveSimilarityRanking,
    notFound
} = require("./handlers");

const jsonBodyParser = bodyParser.json();

const router = express.Router();

router.use(cors);

router.post("/user", jsonBodyParser, registerUser);

router.post("/user/auth", jsonBodyParser, authenticateUser);

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.get('/games', searchGames)

router.get('/game/:gameId', retrieveGameInfo)

router.post('/game/:gameId/review', [jsonBodyParser, tokenVerifierMiddleware], postReview)

router.get('/ranking/:limit', rankingGames)

router.get('/user/:username', retrieveUserByUsername)

router.get('/random', retrieveRandomGame)

router.post('/game/:gameId/prediction', [jsonBodyParser, tokenVerifierMiddleware], retrievePredictedScore)

router.get('/compare/:otherUserUsername', tokenVerifierMiddleware, retrieveEuclideanDistance)

router.get('/similarityranking', tokenVerifierMiddleware, retrieveSimilarityRanking)

// router.get('*', notFound)

module.exports = router;
