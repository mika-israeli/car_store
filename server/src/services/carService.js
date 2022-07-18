const Car = require("../models/car.model");
const genericService = require("./genericService");
const carService = genericService(Car);

carService.getByType = async (type) => {
  return await Car.find({ type: type });
};
carService.getOrderItems = async (ids) => {
  return await Car.find({ _id: { $in: ids } })
    .populate("items")
    .exec();
};
carService.getWithFilters = async (filters, prices) => {
  //paramatarize the filters
  console.log(filters[0]);
  let query = {};
};
module.exports = carService;
