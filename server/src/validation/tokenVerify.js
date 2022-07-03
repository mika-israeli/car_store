const jsonwebtoken = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["auth-token"];

  if (bearerHeader) {
    jsonwebtoken.verify(bearerHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).send("Unauthorized");
  }
};

const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user.id === req.body.user || req.user.id === req.params.id) {
      next();
    } else {
      // res.status(403).send("Unauthorized");
      next();
    }
  });
};
const verifyAuthAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  });
};
module.exports = { verifyAuth, verifyAuthAdmin };
