const order = require("../models/order.model");
const genericService = require("./genericService");
const orderService = genericService(order);
//might need to add more methods to the service
orderService.getByUserId = async (userId) => {
  return await order.find({ userid: userId }).populate("items").exec();
};
orderService.getAllOrders = async () => {
  return await order.find({}).populate("items").exec();
};

module.exports = orderService;
