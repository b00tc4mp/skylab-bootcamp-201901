const express = require("express");
const cors = require('../cors')
const bodyParser = require("body-parser");
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveUserById,
    updateUser,
    deleteUser,
    createEvent,
    listEvents,
    listEventsByQuery,
    listEventsById,
    toogleEvent,
    addComment,
    listComments,
    deleteComment,
    notFound
  } = require("./handlers");

  const jsonBodyParser = bodyParser.json()

  const router = express.Router()

  router.use(cors)

  router.post("/user", jsonBodyParser, registerUser);

  router.post("/user/auth", jsonBodyParser, authenticateUser);

  router.get("/retrieve-user",jsonBodyParser, tokenVerifierMiddleware,retrieveUser);

  router.get("/retrieve-userId/:otherUserId",jsonBodyParser,tokenVerifierMiddleware,retrieveUserById);

  router.put('/user/update' , jsonBodyParser,tokenVerifierMiddleware , updateUser )

  router.delete("/user/delete/:userId" , jsonBodyParser , deleteUser)

  router.post("/create-event", [tokenVerifierMiddleware, jsonBodyParser] , createEvent)

  router.get("/events/:categoryId", tokenVerifierMiddleware,jsonBodyParser, listEvents) 

  router.get('/events/query/:query' , jsonBodyParser ,tokenVerifierMiddleware, listEventsByQuery)

  router.get('/event/:eventId', jsonBodyParser,tokenVerifierMiddleware, listEventsById )

  router.put('/toogle-event/:eventId', jsonBodyParser, tokenVerifierMiddleware, toogleEvent)

  router.post('/add-comment/:eventId' , jsonBodyParser,tokenVerifierMiddleware, addComment )

  router.get('/list-comments/:commentEvent' , jsonBodyParser, tokenVerifierMiddleware, listComments)

  router.delete('/delete-comment/:eventId/:commentId', jsonBodyParser, tokenVerifierMiddleware , deleteComment)

  module.exports = router

