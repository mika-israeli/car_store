const order = require("../models/order.model");
const genericService = require("./genericService");
const orderService = genericService(order);
//might need to add more methods to the service
orderService.getByUserId = async (userId) => {
  return await order.find({ userId: userId }).populate("items").exec();
};

module.exports = orderService;
