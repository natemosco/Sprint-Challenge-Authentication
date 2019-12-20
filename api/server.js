const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const Users = require("../users/users-model");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is working" });
});
server.get("api/users", authenticate, (req, res) => {
  Users.find()
    .then(res => {
      res.status(200).json({ message: "server is working", res });
    })
    .catch(error => {
      res.status(500).json({ message: "internal error fetching users" });
    });
});

module.exports = server;
