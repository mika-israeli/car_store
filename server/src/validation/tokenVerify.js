const jsonwebtoken = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  next();
};

const verifyAuth = (req, res, next) => {
  next();
};
const verifyAuthAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
module.exports = { verifyAuth, verifyAuthAdmin };
