const orders = require("../models/order");
const users = require("../models/user");
const cars = require("../models/car");

const getMostSoldCars = async () => {
  const mostSoldCars = await orders.aggregate([{ $group: { _id: "$carId", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 3 }]);
  return mostSoldCars;
};

const getAllOrdersInDateRange = async (startDate, endDate) => {
  const ordersInDateRange = await orders.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  return ordersInDateRange;
};

const getMonthlySales = async () => {
  const monthlySales = await orders.aggregate([{ $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } }, { $sort: { _id: 1 } }]);
  return monthlySales;
};

module.exports = { getMostSoldCars, getAllOrdersInDateRange };
