const Car = require("../models/car.model");
const genericService = require("./genericService");
const carService = genericService(Car);
const cardata = require("../CarData");
//might need to add more methods to the service
carService.getByType = async (type) => {
  return await Car.find({ type: type });
};

carService.getOrderItems = async (ids) => {
  return await Car.find({ _id: { $in: ids } })
    .populate("items")
    .exec();
};
module.exports = carService;
