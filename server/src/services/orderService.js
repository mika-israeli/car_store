const order = require("../models/order.model");
const genericService = require("./genericService");
const orderService = genericService(order);
//might need to add more methods to the service

module.exports = orderService;
