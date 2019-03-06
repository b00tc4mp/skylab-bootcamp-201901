require("dotenv").config();

require("isomorphic-fetch");

const  mongoose  = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logic = require("./logic");
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
  registerUser,
  authenticateUser,
  retrieveUser,
  updateUser,
  deleteUser,
  createEvent,
  listEvents,
  listEventsByQuery,
  listEventsById,
  addComment,
  listComments,
  deleteComment,
  notFound
} = require("./routes");

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


    const app = express();

    const jsonBodyParser = bodyParser.json();

    const router = express.Router();

    function cors(req, res, next) {
      // res.set('access-control-allow-credentials', true)
      res.set(
        "access-control-allow-headers",
        "Accept, Authorization, Origin, Content-Type, Retry-After"
      );
      // res.set('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
      res.set("access-control-allow-origin", "*");
      // res.set('access-control-max-age', 604800)

      next();
    }

    router.use(cors);

    router.post("/user", jsonBodyParser, registerUser);

    router.post("/user/auth", jsonBodyParser, authenticateUser);

    router.get("/user/:userId", tokenVerifierMiddleware,retrieveUser);

    router.put('/user/update/:userId' , jsonBodyParser,tokenVerifierMiddleware , updateUser )

    router.delete("/user/delete/:userId" , jsonBodyParser , deleteUser)

    router.post("/create-event/:userId", [tokenVerifierMiddleware, jsonBodyParser] , createEvent)

    router.get("/events/:categoryId", jsonBodyParser, listEvents) 

    router.get('/events/query/:query' , jsonBodyParser , listEventsByQuery)

    router.get('/event/:eventId', jsonBodyParser, listEventsById )

    router.post('/add-comment/:eventId' , jsonBodyParser,tokenVerifierMiddleware, addComment )

    router.get('/list-comments/:commentEvent' , jsonBodyParser, tokenVerifierMiddleware, listComments)

    router.get('/delete-comment/:commentId', jsonBodyParser, tokenVerifierMiddleware , deleteComment)

    // app.get('*', notFound)

    app.use("/final-proyect/api", router);

    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);
