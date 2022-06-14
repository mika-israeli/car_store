const expressvalidator = require("express-validator");

function validateSchema(req, res, next) {
  const error = expressvalidator.validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()[0].msg,
    });
  }

  next();
}
module.exports = validateSchema;
