require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logic = require("./logic");
const mongoose = require("mongoose");
const cors = require("cors");
const { tokenVerifierMiddleware } = require("./token-helper");

const {
  registerUser,
  authenticateUser,
  retrieveUser,
  createPost
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
    router.get("/user/post/:id", tokenVerifierMiddleware, retrieveUser);
    app.use("/api", router);
    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);
