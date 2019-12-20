const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  var salt = bcrypt.genSaltSync(12);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "internal error creating new user" });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ token, message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET || process.env.LOCAL_JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
