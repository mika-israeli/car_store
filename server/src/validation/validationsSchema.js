const { body } = require("express-validator");

const userValidationSchema = [
  body("username").isString().isLength({ min: 5, max: 50 }).withMessage("username must be between 5 and 50 characters"),
  body("password").isString().isLength({ min: 5, max: 30 }).withMessage("password must be between 5 and 30 characters"),
  body("email").isEmail().withMessage("email must be a valid email address"),
];
const carValidationSchema = [
  body("manufacturer").isString().isLength({ min: 3, max: 50 }).withMessage("make must be between 3 and 50 characters"),
  body("model").isString().isLength({ min: 3, max: 50 }).withMessage("model must be between 3 and 50 characters"),
  body("year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("year must be a valid year"),
  body("color").isString().isLength({ min: 3, max: 50 }).withMessage("color must be between 3 and 50 characters"),
  body("price").isNumeric().withMessage("price must be a number"),
  body("kilometers").isNumeric().withMessage("kilometers must be a number"),
  //body("type").isArray().withMessage("type must be an array"),
  body("image").isString().withMessage("image must be a string"),
];

const orderValidationSchema = [
  // body("user").isString().isLength({ min: 3, max: 50 }).withMessage("user must be between 3 and 50 characters"),
  // body("items").isArray().withMessage("items must be an array"),
  // body("amount").isNumeric().withMessage("amount must be a number"),
  // body("date").isString().isLength({ min: 3, max: 50 }).withMessage("date must be between 3 and 50 characters"),
  // body("address").isString().isLength({ min: 3, max: 50 }).withMessage("address must be between 3 and 50 characters"),
];
module.exports = { userValidationSchema, carValidationSchema, orderValidationSchema };
