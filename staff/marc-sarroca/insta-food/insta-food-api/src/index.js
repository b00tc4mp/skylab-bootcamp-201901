require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logic = require("./logic");
const { mongoose } = require("insta-food-data");
const cors = require("cors");
const { tokenVerifierMiddleware } = require("./token-helper");

const {
  registerUser,
  authenticateUser,
  retrieveUser,
  createPost,
  retrieveAllPosts,
  retrieveUserPosts,
  addFavorites,
  addComments,
  deletePost
} = require("./routes");

const {
  env: { DB_URL, PORT, JWT_SECRET },
  argv: [, , port = PORT || 8080]
} = process;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(client => {
    logic.jwtSecret = JWT_SECRET;
    const app = express();
    const jsonBodyParser = bodyParser.json();
    const router = express.Router();

    router.use(cors());
    router.post("/user", jsonBodyParser, registerUser);
    router.post("/user/auth", jsonBodyParser, authenticateUser);
    router.get("/user", tokenVerifierMiddleware, retrieveUser);
    router.post(
      "/user/post",
      [jsonBodyParser, tokenVerifierMiddleware],
      createPost
    );
    router.get("/posts/:page", tokenVerifierMiddleware, retrieveAllPosts);
    router.get("/user/:id/posts", tokenVerifierMiddleware, retrieveUserPosts);
    router.get(
      "/user/favorites/:postId",
      tokenVerifierMiddleware,
      addFavorites
    );
    router.post(
      "/user/:postId/comments",
      tokenVerifierMiddleware,
      jsonBodyParser,
      addComments
    );
    router.get("/post/delete/:postId", tokenVerifierMiddleware, deletePost);

    app.use("/api", router);
    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);
