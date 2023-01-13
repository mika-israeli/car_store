const router = require("express").Router();
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const { userValidationSchema } = require("../validation/validationsSchema");
const validateSchema = require("../validation/validation");
const User = require("../models/user.model");
router.post(
  "/register",
  userValidationSchema,
  validateSchema,
  async (req, res) => {
    //check if user already exists
    const usernameExists = await userService.getUserByUsernameOrEmail(
      req.body.username,
      req.body.email
    );
    if (usernameExists) {
      if (usernameExists.username === req.body.username) {
        res.status(400).send({ message: "username already exists" });
        return;
      }
      if (usernameExists.email === req.body.email) {
        res.status(400).send({ message: "email already exists" });
        return;
      }
      return;
    }
    //create the user and hash the password and save it to the database
    try {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      const username = req.body.username;
      const email = req.body.email;
      const password = hashedpassword;
      const newUser = {
        username: username,
        password: password,
        email: email,
      };
      const result = await userService.addUser(newUser);
      res.status(201).json(result);
    } catch (error) {
      res.json(error);
    }
  }
);

//LOGIN
router.post("/login", userValidationSchema, async (req, res) => {
  //validate the data
  const user = await userService.getUserByUsernameOrEmail(req.body.username);
  if (!user) {
    return res.status(400).send("Username does not exist");
  }

  
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }


  //create and assign a token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    "dsadsadasdasdasddasdasdasdsad"
  );
  res.header("auth-token", token).send(user.isAdmin);
});

//RFRESH TOKEN
router.get("/refresh", async (req, res) => {
  const refreshToken = req.headers["auth-token"];
});
module.exports = router;
